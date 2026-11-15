import { type CSSProperties, type PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import type { humanFavorites } from "./portfolioData";

export type FavoriteRevealMode = "click" | "hover" | "scratch";

type Favorite = (typeof humanFavorites)[number];
type Point = { x: number; y: number };

const GRID_COLUMNS = 32;
const GRID_ROWS = 36;
const BRUSH_RADIUS = 32;
const REVEAL_THRESHOLD = 0.34;

export function FavoriteRevealCard({
  favorite,
  mode,
  theme,
  direction,
  onReveal,
}: {
  favorite: Favorite;
  mode: FavoriteRevealMode;
  theme: "dark" | "light";
  direction: -1 | 1;
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const lastPointRef = useRef<Point | null>(null);
  const pointerRef = useRef<number | null>(null);
  const scratchedRef = useRef(new Set<number>());
  const revealedRef = useRef(false);
  const pendingRevealRef = useRef(false);
  const revealFrameRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scratchReady, setScratchReady] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const item = favorite.items[activeItem];
  const visible = revealed || (mode === "hover" && hovered);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.globalCompositeOperation = "source-over";

    const light = theme === "light";
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, light ? "#d5e3ed" : "#1c2940");
    fill.addColorStop(0.48, light ? "#e9eff2" : "#111a2c");
    fill.addColorStop(1, light ? "#bacfdf" : "#172638");
    context.fillStyle = fill;
    context.fillRect(0, 0, width, height);

    const noise = document.createElement("canvas");
    noise.width = noise.height = 128;
    const noiseContext = noise.getContext("2d");
    if (noiseContext) {
      const pixels = noiseContext.createImageData(128, 128);
      for (let index = 0; index < pixels.data.length; index += 4) {
        const value = Math.random() > 0.5 ? 255 : 0;
        pixels.data[index] = pixels.data[index + 1] = pixels.data[index + 2] = value;
        pixels.data[index + 3] = Math.random() * (light ? 22 : 32);
      }
      noiseContext.putImageData(pixels, 0, 0);
      const pattern = context.createPattern(noise, "repeat");
      if (pattern) {
        context.fillStyle = pattern;
        context.fillRect(0, 0, width, height);
      }
    }

    context.strokeStyle = light ? "rgba(31, 69, 95, 0.2)" : "rgba(184, 217, 236, 0.17)";
    context.lineWidth = 1;
    context.beginPath();
    context.roundRect(15, 15, width - 30, height - 30, 18);
    context.stroke();

    const ink = light ? "#284c66" : "#e2dfce";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = ink;
    context.globalAlpha = 0.65;
    context.font = '600 10px "Sora", sans-serif';
    context.fillText("A LITTLE MYSTERY", width / 2, height * 0.2);
    context.globalAlpha = 1;
    context.font = `500 ${Math.min(184, width * 0.54)}px "Outfit", sans-serif`;
    context.fillText("?", width / 2, height * 0.49);
    context.globalAlpha = 0.7;
    context.font = '500 10px "Sora", sans-serif';
    const instruction = mode === "click" ? "CLICK TO REVEAL" : mode === "hover" ? "HOVER TO REVEAL" : "SCRATCH TO REVEAL";
    context.fillText(instruction, width / 2, height * 0.8);
    context.globalAlpha = 1;
  }, [mode, theme]);

  const reset = useCallback(() => {
    if (revealFrameRef.current !== null) cancelAnimationFrame(revealFrameRef.current);
    revealFrameRef.current = null;
    if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = null;
    pendingRevealRef.current = false;
    revealedRef.current = false;
    scratchedRef.current.clear();
    lastPointRef.current = null;
    pointerRef.current = null;
    setRevealed(false);
    setHovered(false);
    setProgress(0);
    setScratchReady(true);
    paintCover();
  }, [paintCover]);

  useEffect(() => {
    reset();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = new ResizeObserver(() => {
      if (pointerRef.current !== null) return;
      scratchedRef.current.clear();
      setProgress(revealedRef.current ? 100 : 0);
      paintCover();
    });
    resize.observe(canvas);
    let active = true;
    void document.fonts.ready.then(() => {
      if (active && scratchedRef.current.size === 0) paintCover();
    });
    return () => {
      active = false;
      resize.disconnect();
      if (revealFrameRef.current !== null) cancelAnimationFrame(revealFrameRef.current);
      if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    };
  }, [paintCover, reset]);

  const reveal = () => {
    if (revealedRef.current) return;
    pendingRevealRef.current = false;
    revealedRef.current = true;
    setRevealed(true);
    setProgress(100);
    onReveal();
  };

  const showNextFavorite = () => {
    if (!visible) {
      reveal();
      return;
    }
    setActiveItem((index) => (index + 1) % favorite.items.length);
    revealedRef.current = true;
    setRevealed(true);
    setProgress(100);
    onReveal();
  };

  const scratch = (point: Point) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || revealedRef.current) return;
    const previous = lastPointRef.current ?? point;
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = BRUSH_RADIUS * 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    context.beginPath();
    context.arc(point.x, point.y, BRUSH_RADIUS, 0, Math.PI * 2);
    context.fill();

    const { width, height } = canvas.getBoundingClientRect();
    const distance = Math.hypot(point.x - previous.x, point.y - previous.y);
    const steps = Math.max(1, Math.ceil(distance / (BRUSH_RADIUS / 2)));
    for (let step = 0; step <= steps; step += 1) {
      const x = previous.x + ((point.x - previous.x) * step) / steps;
      const y = previous.y + ((point.y - previous.y) * step) / steps;
      const startColumn = Math.max(0, Math.floor(((x - BRUSH_RADIUS) / width) * GRID_COLUMNS));
      const endColumn = Math.min(GRID_COLUMNS - 1, Math.ceil(((x + BRUSH_RADIUS) / width) * GRID_COLUMNS));
      const startRow = Math.max(0, Math.floor(((y - BRUSH_RADIUS) / height) * GRID_ROWS));
      const endRow = Math.min(GRID_ROWS - 1, Math.ceil(((y + BRUSH_RADIUS) / height) * GRID_ROWS));
      for (let row = startRow; row <= endRow; row += 1) {
        for (let column = startColumn; column <= endColumn; column += 1) {
          const cellX = ((column + 0.5) / GRID_COLUMNS) * width;
          const cellY = ((row + 0.5) / GRID_ROWS) * height;
          if (Math.hypot(cellX - x, cellY - y) <= BRUSH_RADIUS) {
            scratchedRef.current.add(row * GRID_COLUMNS + column);
          }
        }
      }
    }
    lastPointRef.current = point;
    const coverage = scratchedRef.current.size / (GRID_COLUMNS * GRID_ROWS);
    setProgress(Math.min(100, Math.round((coverage / REVEAL_THRESHOLD) * 100)));
    if (coverage >= REVEAL_THRESHOLD) pendingRevealRef.current = true;
  };

  const pointerPoint = (event: PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    // The surface stays flat while scratching, so coordinates match the mask.
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startScratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "scratch" || revealedRef.current || event.button !== 0 || pointerRef.current !== null) return;
    event.preventDefault();
    pointerRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratch(pointerPoint(event));
  };

  const endScratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (pointerRef.current !== event.pointerId) return;
    pointerRef.current = null;
    lastPointRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (pendingRevealRef.current) {
      setScratchReady(false);
      if (revealFrameRef.current !== null) cancelAnimationFrame(revealFrameRef.current);
      // Keep the scratch surface in place until the gesture has fully ended.
      revealFrameRef.current = requestAnimationFrame(() => {
        revealFrameRef.current = null;
        if (pendingRevealRef.current && pointerRef.current === null) {
          reveal();
          // Let touch compatibility events finish before enabling the next item.
          settleTimerRef.current = window.setTimeout(() => {
            settleTimerRef.current = null;
            setScratchReady(true);
          }, 400);
        }
      });
    }
  };

  const moveSurface = (event: PointerEvent<HTMLDivElement>) => {
    if (mode === "scratch" || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const surface = surfaceRef.current;
    if (!surface) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    surface.style.setProperty("--favorite-tilt-x", `${(0.5 - y) * 8}deg`);
    surface.style.setProperty("--favorite-tilt-y", `${(x - 0.5) * 8}deg`);
    surface.style.setProperty("--favorite-glow-x", `${x * 100}%`);
    surface.style.setProperty("--favorite-glow-y", `${y * 100}%`);
  };

  return (
    <div className="favorite-primary" style={{ "--favorite-enter-x": `${direction * 48}px` } as CSSProperties}>
      <div
        ref={surfaceRef}
        className={`favorite-surface favorite-surface--${mode}${visible ? " is-revealed" : ""}`}
        onPointerEnter={(event) => {
          if (mode === "hover" && event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => {
          setHovered(false);
          surfaceRef.current?.style.setProperty("--favorite-tilt-x", "0deg");
          surfaceRef.current?.style.setProperty("--favorite-tilt-y", "0deg");
        }}
        onPointerMove={moveSurface}
      >
        <div id={`favorite-picks-${favorite.id}`} className="favorite-reveal-content" aria-hidden={!visible}>
          <span className="favorite-content-kicker">{favorite.title}</span>
          {favorite.note && <p className="favorite-note">{favorite.note}</p>}
          <div className="favorite-single-pick" key={item.name}>
            <p className="favorite-item-position" aria-label={`Favorite ${activeItem + 1} of ${favorite.items.length}`}>
              <span>{String(activeItem + 1).padStart(2, "0")}</span>
              <span>/ {String(favorite.items.length).padStart(2, "0")}</span>
            </p>
            {favorite.id === "books" ? <cite>{item.name}</cite> : <span className="favorite-pick-name">{item.name}</span>}
            {item.detail && <span className="favorite-pick-detail">{item.detail}</span>}
          </div>
          <Sparkles className="favorite-content-sparkle" size={22} aria-hidden="true" />
        </div>
        <canvas
          ref={canvasRef}
          className="favorite-scratch-cover"
          aria-hidden="true"
          onPointerDown={startScratch}
          onPointerMove={(event) => {
            if (pointerRef.current === event.pointerId) scratch(pointerPoint(event));
          }}
          onPointerUp={endScratch}
          onPointerCancel={endScratch}
          onLostPointerCapture={(event) => {
            if (pointerRef.current === event.pointerId) {
              pointerRef.current = null;
              lastPointRef.current = null;
            }
          }}
        />
        <div className="favorite-surface-shine" aria-hidden="true" />
        {(mode === "click" || visible) && scratchReady && (
          <button
            type="button"
            className="favorite-card-action"
            aria-label={visible ? `Show next item in ${favorite.title.toLowerCase()}` : `Reveal an item in ${favorite.title.toLowerCase()}`}
            aria-expanded={visible}
            aria-controls={`favorite-picks-${favorite.id}`}
            aria-describedby={`favorite-instruction-${favorite.id}`}
            onClick={showNextFavorite}
          />
        )}
      </div>
      <div className="favorite-reveal-footer">
        <p id={`favorite-instruction-${favorite.id}`} className="favorite-instruction">
          {visible ? "Click the card for the next favorite." : mode === "click" ? "Click to reveal one favorite." : mode === "hover" ? "Hover to reveal one favorite." : "Scratch to reveal one favorite."}
        </p>
        {mode === "scratch" && (
          <div
            className="favorite-scratch-progress"
            role="progressbar"
            aria-label="Scratch reveal progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ "--scratch-progress": `${progress}%` } as CSSProperties}
          ><span /></div>
        )}
        <div className="favorite-item-actions">
          <button
            className="favorite-reveal-button"
            type="button"
            aria-expanded={visible}
            aria-controls={`favorite-picks-${favorite.id}`}
            disabled={!scratchReady}
            onClick={showNextFavorite}
          >
            {visible ? <ArrowRight size={14} aria-hidden="true" /> : <Sparkles size={14} aria-hidden="true" />}
            {!scratchReady ? "Revealing…" : visible ? "Next favorite" : "Reveal favorite"}
          </button>
          {revealed && (
            <button className="favorite-reveal-button favorite-cover-button" type="button" aria-label="Cover this favorite" onClick={reset}>
              <RotateCcw size={14} aria-hidden="true" />
            </button>
          )}
        </div>
        <span className="favorite-reveal-announcement" role="status">{revealed ? `${item.name}. Favorite ${activeItem + 1} of ${favorite.items.length}.` : ""}</span>
      </div>
    </div>
  );
}
