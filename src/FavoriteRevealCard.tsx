import { type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import type { humanFavorites } from "./portfolioData";

type Favorite = (typeof humanFavorites)[number];
type Point = { x: number; y: number };

const GRID_COLUMNS = 32;
const GRID_ROWS = 36;
const BRUSH_RADIUS = 32;
const REVEAL_THRESHOLD = 0.34;

export function FavoriteRevealCard({
  favorite,
  itemIndex,
  theme,
  direction,
  onReveal,
}: {
  favorite: Favorite;
  itemIndex: number;
  theme: "dark" | "light";
  direction: -1 | 1;
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointRef = useRef<Point | null>(null);
  const pointerRef = useRef<number | null>(null);
  const scratchedRef = useRef(new Set<number>());
  const revealedRef = useRef(false);
  const pendingRevealRef = useRef(false);
  const revealFrameRef = useRef<number | null>(null);
  const keyboardPointRef = useRef<Point | null>(null);
  const [revealed, setRevealed] = useState(false);
  const item = favorite.items[itemIndex];

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
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
    context.fillText("SCRATCH TO REVEAL", width / 2, height * 0.8);
    context.globalAlpha = 1;
  }, [theme]);

  const reset = useCallback(() => {
    if (revealFrameRef.current !== null) cancelAnimationFrame(revealFrameRef.current);
    revealFrameRef.current = null;
    pendingRevealRef.current = false;
    revealedRef.current = false;
    scratchedRef.current.clear();
    lastPointRef.current = null;
    pointerRef.current = null;
    keyboardPointRef.current = null;
    setRevealed(false);
    paintCover();
  }, [paintCover]);

  useLayoutEffect(() => {
    reset();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = new ResizeObserver(() => {
      if (pointerRef.current !== null) return;
      scratchedRef.current.clear();
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
    };
  }, [paintCover, reset]);

  const reveal = () => {
    if (revealedRef.current) return;
    pendingRevealRef.current = false;
    revealedRef.current = true;
    setRevealed(true);
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
    if (coverage >= REVEAL_THRESHOLD) pendingRevealRef.current = true;
  };

  const pointerPoint = (event: PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startScratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current || event.button !== 0 || pointerRef.current !== null) return;
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
      if (revealFrameRef.current !== null) cancelAnimationFrame(revealFrameRef.current);
      // Keep the scratch surface in place until the gesture has fully ended.
      revealFrameRef.current = requestAnimationFrame(() => {
        revealFrameRef.current = null;
        if (pendingRevealRef.current && pointerRef.current === null) {
          reveal();
        }
      });
    }
  };

  const scratchWithKeyboard = (event: ReactKeyboardEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) return;
    const moves: Record<string, Point> = {
      ArrowLeft: { x: -32, y: 0 },
      ArrowRight: { x: 32, y: 0 },
      ArrowUp: { x: 0, y: -32 },
      ArrowDown: { x: 0, y: 32 },
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const canvas = event.currentTarget;
    const previous = keyboardPointRef.current ?? { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 };
    const next = {
      x: Math.max(0, Math.min(canvas.clientWidth, previous.x + move.x)),
      y: Math.max(0, Math.min(canvas.clientHeight, previous.y + move.y)),
    };
    lastPointRef.current = previous;
    scratch(next);
    keyboardPointRef.current = next;
    lastPointRef.current = null;
    if (pendingRevealRef.current) reveal();
  };

  return (
    <div className="favorite-primary" style={{ "--favorite-enter-x": `${direction * 48}px` } as CSSProperties}>
      <div className={`favorite-surface${revealed ? " is-revealed" : ""}`}>
        <div className="favorite-reveal-content" aria-hidden={!revealed}>
          {favorite.note && <p className="favorite-note">{favorite.note}</p>}
          <div className="favorite-single-pick">
            {favorite.id === "books" ? <cite>{item.name}</cite> : <span className="favorite-pick-name">{item.name}</span>}
            {item.detail && <span className="favorite-pick-detail">{item.detail}</span>}
            {item.note && <p className="favorite-personal-note">{item.note}</p>}
          </div>
          <Sparkles className="favorite-content-sparkle" size={22} aria-hidden="true" />
        </div>
        <canvas
          ref={canvasRef}
          className="favorite-scratch-cover"
          role="img"
          aria-label={`${favorite.title}, ${itemIndex + 1} of ${favorite.items.length}. ${revealed ? "Revealed." : "Scratch to reveal."}`}
          aria-describedby="favorite-scratch-instructions"
          tabIndex={revealed ? -1 : 0}
          onKeyDown={scratchWithKeyboard}
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
      </div>
      <span className="favorite-reveal-announcement" role="status">{revealed ? `${item.name}${item.detail ? `, ${item.detail}` : ""}.${item.note ? ` ${item.note}` : ""}` : ""}</span>
    </div>
  );
}
