import { type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync, createPortal } from "react-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Check,
  Code2,
  Download,
  Github,
  Instagram,
  Linkedin,
  Moon,
  Music2,
  Palette,
  Pause,
  Play,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import {
  craftCards,
  credentials,
  certifications,
  earlyHer,
  education,
  journeyChapters,
  profile,
  projects,
  resumeHighlights,
  tools,
  whyCards,
} from "./portfolioData";

type Theme = "dark" | "light";

const themeStorageKey = "esther-portfolio-theme";
const soundStorageKey = "esther-portfolio-sound";
const soundLevelStorageKey = "esther-portfolio-sound-level";
const QUIET_SOUND_LEVEL = 0.2;
const MUSIC_VOLUME = 50;
const MUSIC_VIDEO_ID = "BmxO3Y1tKyU";
const clickSoundPath = "/assets/mixkit-coins-handling-1939.wav";
const themeSoundPath = "/assets/mixkit-sand-swish-1494.wav";
const projectRevealSoundPath = "/assets/mixkit-page-forward-single-chime-1107.wav";
const certificateChimePath = "/assets/mixkit-page-back-chime-1108.wav";
const heroRoles = [
  "AI Researcher & Product Engineer",
  "Research Lead, Adaptive Learning Systems",
  "AI for Education",
  "Learning Systems Builder",
];

const buildingPrompts = [
  {
    id: "building",
    q: "What are you currently building?",
    a: "https://useflowst.com is my current focus. It's a multi-agent learning platform that helps people learn faster and retain more by thinking out loud, seeing mental models, and getting feedback from AI agents.",
  },
  {
    id: "how",
    q: "How does it work?",
    a: "It's powered by the Logios cognitive architecture and grounded in a learning doctrine called NeuroMap. Users interact by voice, get visual mental models generated in real time, and receive feedback from multi-agent guidance, all to make any subject click.",
  },
  {
    id: "problem",
    q: "What problem are you solving?",
    a: "Most AI tools are text-in, text-out. That works for some people. But a huge portion of learners think visually, learn by speaking, and retain through expression, not passive reading. Flowst AI is built for them.",
  },
  {
    id: "tech",
    q: "What's powering it?",
    a: "Gemini at the core, with multi-agent orchestration for different learning modes: retrieval, explanation, feedback, and visual generation. The goal is a platform that feels like a thinking partner, not a search engine.",
  },
  {
    id: "available",
    q: "Are you available for work?",
    a: "Yes, I am open to research collaborations and product roles focused on educational AI, adaptive learning, learner agency, and human-centred technology. If the work asks how people can think and learn better with AI, let's talk.",
  },
  {
    id: "join",
    q: "How can I be a part?",
    a: "Send me a DM, let's talk.",
    cta: { label: "DM on Instagram", href: "https://instagram.com/bawocore" },
  },
] as const;

type SoundKind = "nav" | "theme" | "project" | "projectReveal" | "certificate" | "copy" | "contact" | "button";
type ThemeRipple = { x: number; y: number; color: string; id: number } | null;

interface YTPlayerInstance {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  getVideoData(): { title: string; video_id: string; author: string };
  getPlayerState(): number;
  destroy(): void;
}

function createAudioController() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  const context = new AudioContextClass();
  const master = context.createGain();
  const click = new Audio(clickSoundPath);
  const themeSfx = new Audio(themeSoundPath);
  const projectReveal = new Audio(projectRevealSoundPath);
  const certificateChime = new Audio(certificateChimePath);
  let volumeLevel = 1;

  const applyVolume = (level: number) => {
    volumeLevel = level;
    const shapedLevel = level === 0 ? 0 : Math.max(0.035, Math.pow(level, 1.55));
    master.gain.value = 0.24 * shapedLevel;
    click.volume = 0.72 * shapedLevel;
    themeSfx.volume = 0.78 * shapedLevel;
    projectReveal.volume = 0.68 * shapedLevel;
    certificateChime.volume = 0.7 * shapedLevel;
  };

  master.connect(context.destination);
  click.preload = "auto";
  themeSfx.preload = "auto";
  projectReveal.preload = "auto";
  certificateChime.preload = "auto";
  applyVolume(volumeLevel);

  const play = (kind: SoundKind) => {
    if (context.state === "suspended") void context.resume();

    if (kind === "button" || kind === "theme" || kind === "projectReveal" || kind === "certificate") {
      const sample =
        kind === "theme" ? themeSfx : kind === "projectReveal" ? projectReveal : kind === "certificate" ? certificateChime : click;
      sample.currentTime = 0;
      void sample.play();
      return;
    }

    const now = context.currentTime;
    const gain = context.createGain();
    const osc = context.createOscillator();
    const settings = {
      nav: { frequency: 520, end: 660, duration: 0.09, gain: 0.035, type: "sine" as OscillatorType },
      project: { frequency: 220, end: 420, duration: 0.13, gain: 0.04, type: "sine" as OscillatorType },
      copy: { frequency: 660, end: 880, duration: 0.11, gain: 0.035, type: "triangle" as OscillatorType },
      contact: { frequency: 392, end: 587, duration: 0.16, gain: 0.04, type: "sine" as OscillatorType },
      button: { frequency: 520, end: 660, duration: 0.09, gain: 0.035, type: "sine" as OscillatorType },
    }[kind];

    osc.type = settings.type;
    osc.frequency.setValueAtTime(settings.frequency, now);
    osc.frequency.exponentialRampToValueAtTime(settings.end, now + settings.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(settings.gain, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + settings.duration + 0.03);
  };

  const setVolume = (level: number) => {
    applyVolume(level);
  };

  return {
    context,
    play,
    setVolume,
    close: () => {
      click.pause();
      themeSfx.pause();
      projectReveal.pause();
      certificateChime.pause();
      void context.close();
    },
  };
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
    YT: {
      Player: new (element: HTMLElement, config: object) => YTPlayerInstance;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number; UNSTARTED: number };
    };
    onYouTubeIframeAPIReady: () => void;
    startViewTransition?: (updateCallback: () => void) => {
      finished: Promise<void>;
      ready: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  }
}

function App() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<ReturnType<typeof createAudioController> | null>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const progressIntervalRef = useRef<number>(0);
  const themeTimersRef = useRef<number[]>([]);
  const themeTransitionRef = useRef(false);
  const [themeRipple, setThemeRipple] = useState<ThemeRipple>(null);
  // Music always starts paused. A visitor must explicitly press play on every page load.
  const [soundLevel, setSoundLevel] = useState(0);
  const soundEnabled = soundLevel > 0;
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [path, setPath] = useState(() => window.location.pathname);
  const [theme, setTheme] = useState<Theme>(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get("theme");
    if (requestedTheme === "light" || requestedTheme === "dark") {
      return requestedTheme;
    }
    const saved = localStorage.getItem(themeStorageKey);
    return saved === "light" ? "light" : "dark";
  });
  const [trackTitle, setTrackTitle] = useState("");
  const [trackProgress, setTrackProgress] = useState(0);
  const [videoId, setVideoId] = useState(MUSIC_VIDEO_ID);
  const musicPausedByVideoRef = useRef(false);
  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => { soundEnabledRef.current = soundEnabled; }, [soundEnabled]);

  const handleVideoPlay = useCallback(() => {
    if (soundEnabledRef.current && ytPlayerRef.current) {
      ytPlayerRef.current.pauseVideo();
      musicPausedByVideoRef.current = true;
    }
  }, []);

  const handleVideoStop = useCallback(() => {
    if (musicPausedByVideoRef.current && ytPlayerRef.current) {
      ytPlayerRef.current.playVideo();
      musicPausedByVideoRef.current = false;
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      audioRef.current?.close();
      themeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(progressIntervalRef.current);
      ytPlayerRef.current?.destroy();
    };
  }, []);

  // Load YouTube IFrame API and init player on mount
  useEffect(() => {
    const initPlayer = () => {
      if (ytPlayerRef.current) return;
      const mount = document.createElement("div");
      mount.id = "yt-player-mount";
      mount.style.cssText = "position:fixed;top:-300px;left:-300px;width:1px;height:1px;opacity:0;pointer-events:none;";
      document.body.appendChild(mount);

      ytPlayerRef.current = new window.YT.Player(mount, {
        height: 1,
        width: 1,
        videoId: MUSIC_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: MUSIC_VIDEO_ID,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            try {
              // Honour an explicit play click made while the YouTube API was still loading.
              if (soundEnabledRef.current) ytPlayerRef.current?.playVideo();
            } catch { /* player not ready */ }
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT.PlayerState.ENDED && soundEnabledRef.current) {
              try {
                ytPlayerRef.current?.seekTo(0, true);
                ytPlayerRef.current?.playVideo();
              } catch { /* player not ready */ }
              return;
            }
            if (event.data === 1) {
              if (!progressIntervalRef.current) {
                progressIntervalRef.current = window.setInterval(() => {
                  const player = ytPlayerRef.current;
                  if (!player) return;
                  try {
                    const duration = player.getDuration();
                    const current = player.getCurrentTime();
                    if (duration > 0) setTrackProgress(current / duration);
                    const data = player.getVideoData();
                    if (data.title) setTrackTitle(data.title);
                    if (data.video_id) setVideoId(data.video_id);
                  } catch { /* player not ready */ }
                }, 500);
              }
            } else {
              window.clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = 0;
              if (event.data === 0) setTrackProgress(0);
            }
          },
          onError: () => {
            setTrackTitle("");
            setTrackProgress(0);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);

    if (!targetId) {
      window.scrollTo(0, 0);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      target?.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
        item.classList.add("is-visible");
      });
      target?.scrollIntoView();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [path]);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const progress = scrollProgressRef.current;
        if (!progress) return;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        progress.style.transform = `scaleX(${scrollRatio})`;
        setShowBackToTop(scrollRatio > 0.72);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!spotlight || reduceMotion) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let isRunning = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(targetX - currentX) > 0.15 || Math.abs(targetY - currentY) > 0.15) {
        frame = window.requestAnimationFrame(render);
        return;
      }

      isRunning = false;
    };

    const moveSpotlight = (event: PointerEvent | MouseEvent) => {
      if ("pointerType" in event && event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;
      spotlight.classList.add("is-active");

      if (!isRunning) {
        isRunning = true;
        frame = window.requestAnimationFrame(render);
      }
    };

    const hideSpotlight = () => spotlight.classList.remove("is-active");

    window.addEventListener("pointermove", moveSpotlight);
    window.addEventListener("mousemove", moveSpotlight);
    window.addEventListener("pointerleave", hideSpotlight);
    window.addEventListener("mouseleave", hideSpotlight);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveSpotlight);
      window.removeEventListener("mousemove", moveSpotlight);
      window.removeEventListener("pointerleave", hideSpotlight);
      window.removeEventListener("mouseleave", hideSpotlight);
    };
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        item.classList.add("is-visible");
        return;
      }

      observer.observe(item);
    });
    return () => observer.disconnect();
  }, [path]);

  const themeLabel = useMemo(
    () => (theme === "dark" ? "Switch to light mode" : "Switch to dark mode"),
    [theme]
  );

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = createAudioController();
    }

    return audioRef.current;
  };

  const playSound = (kind: SoundKind) => {
    if (!soundEnabled) return;
    const audio = ensureAudio();
    if (!audio) return;
    audio.setVolume(soundLevel);
    audio.play(kind);
  };

  const toggleSound = () => {
    const next = soundEnabled ? 0 : QUIET_SOUND_LEVEL;
    const audio = ensureAudio();
    if (!audio) return;
    audio.setVolume(next);
    if (next > 0) {
      audio.play("button");
      try {
        ytPlayerRef.current?.setVolume(MUSIC_VOLUME);
        ytPlayerRef.current?.playVideo();
      } catch { /* player not ready */ }
    } else {
      try { ytPlayerRef.current?.pauseVideo(); } catch { /* not ready */ }
      setTrackTitle("");
      setTrackProgress(0);
      setVideoId("");
    }
    setSoundLevel(next);
    localStorage.setItem(soundLevelStorageKey, String(next));
    localStorage.setItem(soundStorageKey, next > 0 ? "on" : "off");
  };

  const toggleTheme = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (themeTransitionRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextTheme = theme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty(
      "--theme-radius",
      `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px`
    );
    playSound("theme");

    themeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    themeTimersRef.current = [];

    if (reduceMotion) {
      setTheme(nextTheme);
      return;
    }

    if (document.startViewTransition) {
      themeTransitionRef.current = true;
      document.documentElement.classList.add("theme-view-transition");
      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(nextTheme));
      });

      transition.finished.finally(() => {
        document.documentElement.classList.remove("theme-view-transition");
        themeTransitionRef.current = false;
      });
      return;
    }

    themeTransitionRef.current = true;
    setTheme(nextTheme);
    setThemeRipple({
      x,
      y,
      color: nextTheme === "light" ? "rgba(245, 251, 255, 0.72)" : "rgba(1, 5, 15, 0.72)",
      id: Date.now(),
    });
    themeTimersRef.current = [
      window.setTimeout(() => {
        setThemeRipple(null);
        themeTimersRef.current = [];
        themeTransitionRef.current = false;
      }, 760),
    ];
  };

  const navigateTo = (nextPath: string) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  };

  const activeProjectSlug = path.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const activeProject = projects.find((project) => project.slug === activeProjectSlug);
  const isCertificationsPage = path === "/certifications" || path === "/certifications/";
  const isEarlyHerPage = path === "/earlyher" || path === "/earlyher/";

  return (
    <>
      <div className="cursor-spotlight" ref={spotlightRef} aria-hidden="true" />
      <div className="scroll-progress" ref={scrollProgressRef} aria-hidden="true" />
      {themeRipple ? (
        <span
          className="theme-ripple"
          key={themeRipple.id}
          style={{ left: themeRipple.x, top: themeRipple.y, "--theme-ripple-color": themeRipple.color } as CSSProperties}
          aria-hidden="true"
        />
      ) : null}
      <Nav
        theme={theme}
        themeLabel={themeLabel}
        onThemeToggle={toggleTheme}
        onSoundCue={playSound}
      />
      <main className="site-shell">
        {activeProject ? (
          <ProjectDetail project={activeProject} onBack={() => navigateTo("/")} onNavigate={navigateTo} onSoundCue={playSound} />
        ) : isCertificationsPage ? (
          <CertificationsPage onBack={() => navigateTo("/")} onSoundCue={playSound} />
        ) : isEarlyHerPage ? (
          <EarlyHerPage onBack={() => navigateTo("/")} onSoundCue={playSound} />
        ) : (
          <>
            <Hero onSoundCue={playSound} />
            <CurrentDirection />
            <Projects onNavigate={navigateTo} onSoundCue={playSound} />
            <Writing onSoundCue={playSound} />
            <Journey />
          </>
        )}
      </main>
      {/* Still wavy-mesh surface: fixed backdrop every page scrolls over,
          flowing into the ocean footer on the main page */}
      <div className="site-mesh" aria-hidden="true" />
      {!activeProject && !isCertificationsPage && !isEarlyHerPage && (
        <Footer onSoundCue={playSound} />
      )}
      <button
        className={showBackToTop ? "back-to-top is-visible" : "back-to-top"}
        type="button"
        onClick={() => {
          playSound("button");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUpRight size={16} />
      </button>
      <FloatingMusicPlayer
        soundEnabled={soundEnabled}
        trackTitle={trackTitle}
        trackProgress={trackProgress}
        videoId={videoId}
        onTogglePlay={toggleSound}
      />
    </>
  );
}

function Nav({
  theme,
  themeLabel,
  onThemeToggle,
  onSoundCue,
}: {
  theme: Theme;
  themeLabel: string;
  onThemeToggle: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  return (
    <header className="nav-wrap">
      <a href="/" className="brand-mark" aria-label="Esther Tsotso home" onClick={() => onSoundCue("button")}>
        <img src="/assets/logo-e.png" alt="" aria-hidden="true" />
      </a>

      <div className="nav-controls">
        <a
          className="nav-resume-cta"
          href={profile.cvUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => onSoundCue("button")}
        >
          Resume <ArrowUpRight size={13} />
        </a>
        <button
          className="theme-toggle"
          aria-label={themeLabel}
          title={themeLabel}
          onClick={onThemeToggle}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}

function FloatingMusicPlayer({
  soundEnabled,
  trackTitle,
  trackProgress,
  videoId,
  onTogglePlay,
}: {
  soundEnabled: boolean;
  trackTitle: string;
  trackProgress: number;
  videoId: string;
  onTogglePlay: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  useEffect(() => { setImgError(false); }, [videoId]);

  const thumbnailUrl = videoId && !imgError
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <aside
      className={`floating-player${soundEnabled ? " is-playing" : ""}`}
      aria-label={soundEnabled && trackTitle ? `Now playing: ${trackTitle}` : "Music player"}
    >
      <div className={`floating-player-disc${soundEnabled ? " is-spinning" : ""}`}>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="" onError={() => setImgError(true)} />
        ) : (
          <Music2 size={16} aria-hidden="true" />
        )}
      </div>
      <div className="floating-player-body">
        {soundEnabled ? (
          <div className="floating-player-track">
            <span className="floating-player-title">{trackTitle || "Loading…"}</span>
            <div
              className={`floating-player-bar${soundEnabled && !trackTitle ? " is-loading" : ""}`}
              role="progressbar"
              aria-valuenow={Math.round(trackProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ "--progress": `${trackProgress * 100}%` } as CSSProperties}
            />
          </div>
        ) : (
        <span className="floating-player-hint">
          <Music2 size={11} aria-hidden="true" />
          click to listen
        </span>
        )}
      </div>
      <button
        className="floating-player-toggle"
        onClick={onTogglePlay}
        aria-label={soundEnabled ? "Pause music" : "Play music"}
        title={soundEnabled ? "Pause" : "Play"}
        type="button"
      >
        {soundEnabled ? <Pause size={13} /> : <Play size={13} />}
      </button>
    </aside>
  );
}

type BuildMessage = { from: "user" | "bot"; text: string; cta?: { label: string; href: string } };

function ActivelyBuildingModal({
  onClose,
  onSoundCue,
}: {
  onClose: () => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  const [messages, setMessages] = useState<BuildMessage[]>([
    { from: "bot", text: "Hey! Tap any question below to see what I'm up to right now." },
  ]);
  const [pending, setPending] = useState(false);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  const handlePrompt = (prompt: (typeof buildingPrompts)[number]) => {
    if (pending || usedIds.has(prompt.id)) return;
    onSoundCue("button");
    setUsedIds((prev) => new Set(prev).add(prompt.id));
    setMessages((prev) => [...prev, { from: "user", text: prompt.q }]);
    setPending(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: prompt.a, ...("cta" in prompt ? { cta: prompt.cta } : {}) }]);
      setPending(false);
    }, 720);
  };

  const renderMessageText = (text: string) => {
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) =>
      /^https?:\/\//.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      ) : (
        part
      ),
    );
  };

  return createPortal(
    <div className="ab-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Actively building chat">
      <div className="ab-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ab-header">
          <span className="ab-orb" aria-hidden="true" />
          <span className="ab-header-title">Esther's Build Log</span>
          <button className="ab-close" onClick={onClose} aria-label="Close chat">✕</button>
        </div>
        <div className="ab-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`ab-bubble ab-bubble--${msg.from}`}>
              {renderMessageText(msg.text)}
              {msg.cta && (
                <a className="ab-cta" href={msg.cta.href} target="_blank" rel="noreferrer">
                  <Instagram size={13} />
                  {msg.cta.label}
                </a>
              )}
            </div>
          ))}
          {pending && (
            <div className="ab-bubble ab-bubble--bot ab-bubble--typing">
              <span /><span /><span />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="ab-prompts">
          {buildingPrompts.map((prompt) => (
            <button
              key={prompt.id}
              className={`ab-prompt${usedIds.has(prompt.id) ? " is-used" : ""}`}
              onClick={() => handlePrompt(prompt)}
              disabled={pending}
            >
              {prompt.q}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Hero({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  return (
    <section className="index-hero about-hero section-anchor" id="home">
      <p className="index-kicker" data-reveal>About me</p>
      <div className="index-hero-grid">
        <div className="index-hero-copy">
          <h1 className="about-hero-title" data-reveal>I’m Esther Bawo Tsotso.</h1>
          <div className="about-hero-story" data-reveal>
            <p>
              I’m an AI researcher and product engineer in Nigeria. I lead adaptive-learning systems
              research at SILT Institute and I’m building Flowst, an AI learning platform.
            </p>
            <p>
              I started by helping people learn computers,
              taught in classrooms, and spent years in radio and television learning how to listen and
              translate ideas. Then I returned to technology to build products. Each chapter made me
              more curious about how people understand, trust, and grow.
            </p>
            <p>
              I believe technology should expand human capability to earn, create and connect, not quietly replace it. The world I
              want to help design makes room for different kinds of minds and intelligence, protects
              human agency, and treats learning as something deeply human.
            </p>
            <p>
              My life is bigger than the work. My relationship with God anchors me, and loving God shapes
              how I try to move through the world. I love family, meaningful connection, and the kind of
              conversations that help people feel seen. Those things shape how I lead, research, and build.
            </p>
          </div>
          <div className="about-hero-links" data-reveal>
            <SocialLinks compact />
          </div>
        </div>
        <figure className="hero-headshot" data-reveal>
          <img src={profile.headshot} alt="Esther Bawo Tsotso" />
          <figcaption>Esther Bawo Tsotso - Research Lead, SILT Institute</figcaption>
        </figure>
      </div>
    </section>
  );
}

function CurrentDirection() {
  const focusAreas = [
    {
      number: "01",
      title: "Cognitive effort",
      copy: "When should AI guide a learner, and when should it step back?",
    },
    {
      number: "02",
      title: "Learner agency",
      copy: "How can assistance strengthen judgment instead of creating dependence?",
    },
    {
      number: "03",
      title: "Responsible systems",
      copy: "What should age-aware, human-centred educational AI protect by design?",
    },
  ];

  return (
    <section className="now-section section-anchor" id="research">
      <div className="index-section-heading" data-reveal>
        <p>Present - 2026</p>
        <div>
          <h2>Researching AI for how people learn.</h2>
          <p>
            At SILT Institute, I lead work on adaptive learning systems. Flowst is where that inquiry
            becomes something learners can use, question, and shape.
          </p>
          <a href={profile.links.silt} target="_blank" rel="noreferrer">
            Research profile <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <ol className="focus-index" data-reveal>
        {focusAreas.map((area) => (
          <li key={area.number}>
            <span>{area.number}</span>
            <strong>{area.title}</strong>
            <p>{area.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Journey() {
  return (
    <section className="journey-index section-anchor" id="journey">
      <div className="index-section-heading" data-reveal>
        <p>Journey | 2007—now</p>
        <div>
          <h2>One question, seen from different rooms.</h2>
          <p>
            Teaching, broadcasting, engineering, and research each taught me something about how
            people understand difficult things. Open any chapter for the fuller story.
          </p>
        </div>
      </div>
      <div className="journey-rows" aria-label="Career journey">
        {journeyChapters.slice().reverse().map((chapter, index) => (
          <details className="journey-row" data-reveal key={`${chapter.period}-${chapter.title}`}>
            <summary>
              <span className="journey-row-number">{String(index + 1).padStart(2, "0")}</span>
              <time>{chapter.period}</time>
              <div>
                <small>{chapter.phase}</small>
                <h3>{chapter.title}</h3>
              </div>
              <ArrowDown size={16} aria-hidden="true" />
            </summary>
            <div className="journey-row-detail">
              <p className="journey-row-role">{chapter.role} / {chapter.org}</p>
              <p>{chapter.copy}</p>
              <p><strong>What stayed with me:</strong> {chapter.carriedForward}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function RotatingEyebrow() {
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % heroRoles.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <p className="eyebrow rotating-eyebrow" data-reveal aria-label={heroRoles.join(", ")}>
      {heroRoles.map((role, index) => (
        <span className={index === activeRole ? "is-active" : ""} aria-hidden={index !== activeRole} key={role}>
          {role}
        </span>
      ))}
    </p>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "social-links compact" : "social-links"} aria-label="Social links">
      <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
        <Linkedin size={compact ? 13 : 17} />
        <span>LinkedIn</span>
      </a>
      <a href={profile.links.github} target="_blank" rel="noreferrer">
        <Github size={compact ? 13 : 17} />
        <span>GitHub</span>
      </a>
      <a href={profile.links.instagram} target="_blank" rel="noreferrer">
        <Instagram size={compact ? 13 : 17} />
        <span>Instagram</span>
      </a>
      <a href={profile.links.substack} target="_blank" rel="noreferrer">
        <ArrowUpRight size={compact ? 13 : 17} />
        <span>Substack</span>
      </a>
    </div>
  );
}

function Writing({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  return (
    <section className="writing-index section-anchor" id="writing">
      <div className="index-section-heading" data-reveal>
        <p>Where I write my worldview</p>
        <div>
          <h2>Notes on how I view the world with Artificial Intelligence.</h2>
          <p>
            Essays and field notes on intelligence, learning, technology, and the ideas shaping my
            what i build.
          </p>
        </div>
      </div>
      <a
        className="publication-row"
        href={profile.links.substack}
        target="_blank"
        rel="noreferrer"
        onClick={() => onSoundCue("button")}
        data-reveal
      >
        <span className="publication-mark">
          <img src="/web.png" alt="whatWEBecome Substack logo" />
        </span>
        <div>
          <small>Newsletter | Substack</small>
          <h3>whatWEBecome</h3>
          <p>Worldviews and working notes from designing for many forms of intelligence.</p>
        </div>
        <span className="publication-status">New essays coming soon</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}

function Tools() {
  return (
    <section className="tools-section">
      <div className="section-kicker" data-reveal>
        <span>Craft stack</span>
        <p>My current toolkit for moving from idea to shipped interface.</p>
      </div>
      <div className="tool-marquee" data-reveal>
        <div className="tool-track" aria-label="Craft stack">
          {[...tools, ...tools].map((tool, index) => (
            <span className="tool-chip" key={`${tool.name}-${index}`} aria-hidden={index >= tools.length}>
              <img src={tool.icon} alt="" aria-hidden="true" />
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({
  onNavigate,
  onSoundCue,
}: {
  onNavigate: (path: string) => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  const projectSummaries: Record<string, string> = {
    flowst: "An agent-led learning system built around understanding, expression, and feedback.",
    "echo-landing": "A safety platform that turns urgent signals into clear, coordinated action.",
    veritrade: "An AI-assisted trust layer for safer peer-to-peer commerce.",
    "loft-craft": "A product experience that makes custom furniture easier to imagine and order.",
  };
  const featuredProjectSlugs = ["flowst", "echo-landing", "veritrade", "loft-craft"];
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <section className="project-index section-anchor" id="projects">
      <div className="index-section-heading" data-reveal>
        <p>Selected work | 2024—now</p>
        <div>
          <h2>Technical Explorations</h2>
          <p>Four products that show how I move from a human problem to a system people can use.</p>
        </div>
      </div>
      <div className="project-rows" aria-label="Selected case studies">
        {featuredProjects.map((project, index) => (
          <a
            className="project-row"
            data-reveal
            href={`/work/${project.slug}`}
            key={project.slug}
            onPointerEnter={() => onSoundCue("project")}
            onClick={(event) => {
              event.preventDefault();
              onSoundCue("button");
              onNavigate(`/work/${project.slug}`);
            }}
          >
            <span className="project-row-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="project-row-title">
              <h3>{project.name}</h3>
              <p>{project.role}</p>
            </div>
            <p className="project-row-summary">{projectSummaries[project.slug]}</p>
            <span className="project-row-year">{project.year}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

function ProjectDetail({
  project,
  onBack,
  onNavigate,
  onSoundCue,
}: {
  project: (typeof projects)[number];
  onBack: () => void;
  onNavigate: (path: string) => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const goTo = (slug: string) => {
    onSoundCue("button");
    onNavigate(`/work/${slug}`);
  };

  return (
    <article className="case-study">
      <button
        className="back-link"
        type="button"
        onClick={() => {
          onSoundCue("button");
          onBack();
        }}
      >
        <ArrowLeft size={16} />
        Back to portfolio
      </button>

      <header className="case-hero">
        <p className="eyebrow">{project.role} | {project.year}</p>
        <h1>{project.name}</h1>
        <span>{project.description}</span>
        <div className="case-actions">
          {project.aiReview ? (
            <a href="#ai-collab-review" onClick={() => onSoundCue("button")}>
              AI Collab Review <Sparkles size={15} />
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
              View live project <ArrowUpRight size={15} />
            </a>
          ) : null}
          {project.codeUrl ? (
            <a href={project.codeUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
              Codebase <Github size={15} />
            </a>
          ) : null}
        </div>
      </header>

      <figure className="case-cover">
        <img src={project.image} alt={`${project.name} project preview`} />
      </figure>

      <section className="case-grid">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>The problem</h2>
        </div>
        <p>{project.overview}</p>
      </section>

      <section className="case-grid">
        <div>
          <p className="eyebrow">My role</p>
          <h2>What I owned</h2>
        </div>
        <p>{project.roleDetails}</p>
      </section>

      <section className="case-list-section">
        <div className="section-heading">
          <p>Process</p>
          <h2>How I approached it.</h2>
        </div>
        <div className="case-list">
          {project.process.map((item, index) => (
            <article className="case-note" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-list-section">
        <div className="section-heading">
          <p>Outcome</p>
          <h2>What it demonstrates.</h2>
        </div>
        <div className="case-list">
          {project.outcomes.map((item) => (
            <article className="case-note" key={item}>
              <Check size={18} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-list-section">
        <div className="section-heading">
          <p>Lessons</p>
          <h2>What I took forward.</h2>
        </div>
        <div className="case-list">
          {project.lessons.map((item) => (
            <article className="case-note" key={item}>
              <Sparkles size={18} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-list-section">
        <div className="section-heading">
          <p>Transferable skills</p>
          <h2>Where the learning travels.</h2>
        </div>
        <div className="case-skill-list">
          {project.transferableSkills.map((skill) => (
            <span className="badge" key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className={project.aiReview ? "case-grid case-ai has-ai-review" : "case-grid case-ai"}>
        <div>
          <p className="eyebrow">Use of AI</p>
          <h2>How AI supported the work</h2>
          {project.aiReview ? (
            <a className="ai-note-jump" href="#ai-collab-review" onClick={() => onSoundCue("button")}>
              <span>AI&apos;s note below</span>
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          ) : null}
        </div>
        <p>{project.aiUse}</p>
      </section>

      {project.aiReview ? (
        <section className="case-grid case-ai-review" id="ai-collab-review">
          <div>
            <p className="eyebrow">Collaboration review</p>
            <h2>AI's note on working with me</h2>
          </div>
          <div className="ai-review-list">
            {project.aiReview.map((item) => (
              <article key={item.label}>
                <strong>{item.label}:</strong>
                <p>{item.comment}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="case-stack">
        <p className="eyebrow">Tech stack</p>
        <div className="tags">
          {project.tech.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <nav className="case-project-nav" aria-label="Project navigation">
        {prevProject ? (
          <button className="case-nav-btn" onClick={() => goTo(prevProject.slug)}>
            <ArrowLeft size={18} />
            <span>
              <small>Previous</small>
              {prevProject.name}
            </span>
          </button>
        ) : <div />}

        {nextProject ? (
          <button className="case-nav-btn case-nav-btn--next" onClick={() => goTo(nextProject.slug)}>
            <span>
              <small>Next project</small>
              {nextProject.name}
            </span>
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            className="case-nav-btn case-nav-btn--home"
            onClick={() => {
              onSoundCue("button");
              onBack();
              setTimeout(() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }}
          >
            <span>
              <small>That's all of them</small>
              Back to projects
            </span>
            <ArrowRight size={18} />
          </button>
        )}
      </nav>
    </article>
  );
}

function CertificationsPage({
  onBack,
  onSoundCue,
}: {
  onBack: () => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  const [activeCertificate, setActiveCertificate] = useState(0);
  const imageCertificates = certifications.filter((item) => item.image);
  const digitalBadges = certifications.filter((item) => !item.image);
  const certificate = imageCertificates[activeCertificate];
  const nextCertificate = imageCertificates[(activeCertificate + 1) % imageCertificates.length];
  const goToCertificate = (index: number) => {
    onSoundCue("certificate");
    setActiveCertificate((index + imageCertificates.length) % imageCertificates.length);
  };

  return (
    <article className="certifications-page">
      <button
        className="back-link"
        type="button"
        onClick={() => {
          onSoundCue("button");
          onBack();
        }}
      >
        <ArrowLeft size={16} />
        Back to portfolio
      </button>

      <header className="case-hero certifications-hero">
        <p className="eyebrow">Certifications</p>
        <h1>An ardent learner's receipts</h1>
        <span>
          A curated shelf of certificates and digital badges that support the way I build:
          technical depth, product thinking, user empathy, and continuous learning.
        </span>
      </header>

      <section className="certification-carousel" aria-label="Certification carousel">
        <div className="certification-carousel-top">
          <div className="certification-progress" aria-label={`Certificate ${activeCertificate + 1} of ${imageCertificates.length}`}>
            <span>{String(activeCertificate + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(imageCertificates.length).padStart(2, "0")}</span>
          </div>
          <div className="certification-controls">
            <button type="button" onClick={() => goToCertificate(activeCertificate - 1)} aria-label="Previous certification">
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={() => goToCertificate(activeCertificate + 1)} aria-label="Next certification">
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="certification-view">
          <article className="certification-card certification-card-active" key={`${certificate.issuer}-${certificate.title}-${certificate.verifyUrl ?? certificate.image}`}>
            <a
              className="certification-image"
              href={certificate.verifyUrl ?? certificate.image}
              target="_blank"
              rel="noreferrer"
              onClick={() => onSoundCue("button")}
            >
              <img src={certificate.image} alt={`${certificate.title} certificate`} />
            </a>
            <div className="certification-copy">
              <span className="badge">{certificate.category}</span>
              <h2>{certificate.title}</h2>
              <p>{certificate.issuer}</p>
              <div className="certification-details">
                <p className="certification-takeaway">{certificate.takeaway}</p>
                <div className="certification-skills">
                  {certificate.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
              {certificate.verifyUrl ? (
                <a href={certificate.verifyUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
                  Verify credential <ArrowUpRight size={14} />
                </a>
              ) : null}
            </div>
          </article>

          <button
            className="certification-preview"
            type="button"
            onClick={() => goToCertificate(activeCertificate + 1)}
            aria-label={`Preview next certification: ${nextCertificate.title}`}
          >
            <span>Next</span>
            <strong>{String(((activeCertificate + 1) % imageCertificates.length) + 1).padStart(2, "0")}</strong>
            <em>{nextCertificate.title}</em>
          </button>
        </div>

        <div className="certification-number-rail" aria-label="Choose a certification">
          {imageCertificates.map((item, index) => (
            <button
              type="button"
              key={`${item.issuer}-${item.title}-${index}`}
              className={index === activeCertificate ? "is-active" : ""}
              onClick={() => goToCertificate(index)}
              aria-label={`Open ${item.title}`}
              aria-current={index === activeCertificate ? "step" : undefined}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </section>

      <section className="digital-badges-section">
        <div className="section-heading">
          <p>Digital badges</p>
          <h2>Futher proof of my commitment to continuous learning</h2>
          <span>Verifiable digital badges</span>
        </div>
        <div className="digital-badge-list">
          {digitalBadges.map((badge, index) => (
            <article className="digital-badge-card" key={`${badge.issuer}-${badge.title}-${badge.verifyUrl}`}>
              <span className="rail-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <span className="badge">{badge.category}</span>
                <h3>{badge.title}</h3>
                <p className="muted-line">{badge.issuer}</p>
                <div className="certification-details">
                  <p>{badge.takeaway}</p>
                  <div className="certification-skills">
                    {badge.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                {badge.verifyUrl ? (
                  <a href={badge.verifyUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
                    Verify badge <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

// ── EarlyHer Engagement Page ──────────────────────────────────────────────────

function EarlyHerPhotoCarousel({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const photos = earlyHer.photos;

  const movePhoto = (direction: 1 | -1) => {
    onSoundCue("certificate");
    setActivePhoto((i) => (i + direction + photos.length) % photos.length);
  };

  return (
    <div className="eh-photo-carousel" data-reveal>
      <div className="project-carousel-top">
        <div>
          <span>{String(activePhoto + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(photos.length).padStart(2, "0")}</span>
        </div>
        <div className="project-carousel-controls">
          <button type="button" onClick={() => movePhoto(-1)} aria-label="Previous photo">
            <ArrowLeft size={16} />
          </button>
          <button type="button" onClick={() => movePhoto(1)} aria-label="Next photo">
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <div
        className="eh-photo-view"
        onTouchStart={(e) => { touchStartRef.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          if (touchStartRef.current === null) return;
          const dist = (e.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
          touchStartRef.current = null;
          if (Math.abs(dist) < 42) return;
          movePhoto(dist < 0 ? 1 : -1);
        }}
      >
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            className={`eh-photo-card${index === activePhoto ? " is-active" : ""}`}
            aria-hidden={index !== activePhoto}
          >
            <img src={photo.src} alt={photo.caption} />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="project-carousel-dots" aria-label="Photo navigation">
        {photos.map((photo, index) => (
          <button
            type="button"
            key={photo.src}
            className={index === activePhoto ? "is-active" : ""}
            onClick={() => { onSoundCue("certificate"); setActivePhoto(index); }}
            aria-label={`Show ${photo.caption}`}
            aria-current={index === activePhoto ? "true" : undefined}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}

function EarlyHerDeliverablesCarousel({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  const deliverables = earlyHer.deliverables;
  const [active, setActive] = useState(0);
  const touchStartRef = useRef<number | null>(null);

  const move = (dir: 1 | -1) => {
    onSoundCue("projectReveal");
    setActive((i) => (i + dir + deliverables.length) % deliverables.length);
  };

  const d = deliverables[active];

  return (
    <section className="case-list-section eh-deliverables-carousel">
      <div className="section-heading" data-reveal>
        <p>Scope of work</p>
        <h2>What gets delivered.</h2>
      </div>

      <div className="eh-del-wrap" data-reveal>
        {/* Counter + controls */}
        <div className="project-carousel-top">
          <div>
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(deliverables.length).padStart(2, "0")}</span>
          </div>
          <div className="project-carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous deliverable">
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next deliverable">
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card */}
        <div
          className="eh-del-stage"
          onTouchStart={(e) => { touchStartRef.current = e.touches[0]?.clientX ?? null; }}
          onTouchEnd={(e) => {
            if (touchStartRef.current === null) return;
            const dist = (e.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
            touchStartRef.current = null;
            if (Math.abs(dist) < 42) return;
            move(dist < 0 ? 1 : -1);
          }}
        >
          <article className="eh-del-card" key={d.number}>
            <span className="eh-del-num">{d.number}</span>
            <strong className="eh-del-title">{d.title}</strong>
            <p className="eh-del-desc">{d.desc}</p>
          </article>
        </div>

        {/* Dot nav */}
        <div className="project-carousel-dots" aria-label="Deliverable navigation">
          {deliverables.map((item, i) => (
            <button
              type="button"
              key={item.number}
              className={i === active ? "is-active" : ""}
              onClick={() => { onSoundCue("projectReveal"); setActive(i); }}
              aria-label={`View deliverable ${item.number}`}
              aria-current={i === active ? "true" : undefined}
            >
              {item.number}
            </button>
          ))}
        </div>

        {/* Print-only: full deliverable list */}
        <ol className="eh-print-list">
          {deliverables.map((item) => (
            <li key={item.number}>
              <strong>{item.number} — {item.title}</strong>
              <p>{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function EarlyHerStagesCarousel({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  const stages = earlyHer.stages;
  const [active, setActive] = useState(0);
  const touchStartRef = useRef<number | null>(null);

  const move = (dir: 1 | -1) => {
    onSoundCue("projectReveal");
    setActive((i) => (i + dir + stages.length) % stages.length);
  };

  const s = stages[active];

  return (
    <section className="case-list-section">
      <div className="section-heading" data-reveal>
        <p>Proposed payment structure</p>
        <h2>Eight milestones. Pay as we build.</h2>
      </div>

      <div className="eh-del-wrap" data-reveal>
        {/* Counter + controls */}
        <div className="project-carousel-top">
          <div>
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(stages.length).padStart(2, "0")}</span>
          </div>
          <div className="project-carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous stage">
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next stage">
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card */}
        <div
          className="eh-del-stage"
          onTouchStart={(e) => { touchStartRef.current = e.touches[0]?.clientX ?? null; }}
          onTouchEnd={(e) => {
            if (touchStartRef.current === null) return;
            const dist = (e.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
            touchStartRef.current = null;
            if (Math.abs(dist) < 42) return;
            move(dist < 0 ? 1 : -1);
          }}
        >
          <article className="eh-stage-card" key={s.stage}>
            <span className="eh-stage-card-num">{s.stage}</span>
            <div className="eh-stage-card-body">
              <strong className="eh-stage-card-amount">{s.amount}</strong>
              <p className="eh-stage-card-title">{s.title}</p>
              <p className="eh-stage-card-trigger">{s.trigger}</p>
            </div>
          </article>
        </div>

        {/* Number rail nav */}
        <div className="project-carousel-dots" aria-label="Stage navigation">
          {stages.map((item, i) => (
            <button
              type="button"
              key={item.stage}
              className={i === active ? "is-active" : ""}
              onClick={() => { onSoundCue("projectReveal"); setActive(i); }}
              aria-label={`View stage ${item.stage}`}
              aria-current={i === active ? "true" : undefined}
            >
              {item.stage}
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="eh-stage-total" style={{ marginTop: 20, borderRadius: 12 }}>
          <span>Total investment</span>
          <strong>{earlyHer.finalRate}</strong>
        </div>

        {/* Print-only: full stage list */}
        <ol className="eh-print-list eh-print-stages">
          {stages.map((item) => (
            <li key={item.stage}>
              <strong>{item.stage} — {item.title}</strong>
              <span className="eh-print-amount">{item.amount}</span>
              <p>{item.trigger}</p>
            </li>
          ))}
          <li className="eh-print-total">
            <strong>Total</strong>
            <span className="eh-print-amount">{earlyHer.finalRate}</span>
          </li>
        </ol>
      </div>
    </section>
  );
}

function EarlyHerCompetitorsCarousel({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  const competitors = earlyHer.competitors;
  const [active, setActive] = useState(0);
  const touchStartRef = useRef<number | null>(null);

  const move = (dir: 1 | -1) => {
    onSoundCue("projectReveal");
    setActive((i) => (i + dir + competitors.length) % competitors.length);
  };

  const c = competitors[active];

  return (
    <div className="eh-del-wrap eh-competitor-wrap" data-reveal>
      {/* Counter + controls */}
      <div className="project-carousel-top">
        <div>
          <span>{String(active + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(competitors.length).padStart(2, "0")}</span>
        </div>
        <div className="project-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous competitor">
            <ArrowLeft size={16} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next competitor">
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Card */}
      <div
        className="eh-del-stage"
        onTouchStart={(e) => { touchStartRef.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          if (touchStartRef.current === null) return;
          const dist = (e.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
          touchStartRef.current = null;
          if (Math.abs(dist) < 42) return;
          move(dist < 0 ? 1 : -1);
        }}
      >
        <div className="eh-competitor-card eh-competitor-card--solo" key={c.name}>
          <div className="eh-competitor-header">
            <strong className="eh-competitor-name">{c.name}</strong>
            <span className="eh-competitor-category">{c.category}</span>
          </div>
          <p className="eh-competitor-solves">{c.solves}</p>
          <div className="eh-competitor-gap">
            <span>The gap</span>
            <p>{c.gap}</p>
          </div>
        </div>
      </div>

      {/* Number rail nav */}
      <div className="project-carousel-dots" aria-label="Competitor navigation">
        {competitors.map((item, i) => (
          <button
            type="button"
            key={item.name}
            className={i === active ? "is-active" : ""}
            onClick={() => { onSoundCue("projectReveal"); setActive(i); }}
            aria-label={`View ${item.name}`}
            aria-current={i === active ? "true" : undefined}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Print-only: full competitor list */}
      <ol className="eh-print-list eh-print-competitors">
        {competitors.map((item) => (
          <li key={item.name}>
            <strong>{item.name} — {item.category}</strong>
            <p>{item.solves}</p>
            <p><em>The gap:</em> {item.gap}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EarlyHerPage({
  onBack,
  onSoundCue,
}: {
  onBack: () => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  return (
    <article className="case-study eh-page">
      {/* Top bar */}
      <div className="eh-topbar no-print">
        <button
          className="back-link"
          type="button"
          onClick={() => { onSoundCue("button"); onBack(); }}
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </button>
        <button
          className="eh-download-btn"
          type="button"
          onClick={() => {
            onSoundCue("button");
            const prev = document.title;
            document.title = "EarlyHer Proposal — Esther Tsotso";
            window.print();
            document.title = prev;
          }}
          title="Download proposal as PDF"
        >
          <Download size={15} />
          Download PDF
        </button>
      </div>

      {/* Hero */}
      <header className="case-hero eh-hero">
        <p className="eyebrow">Proposal Made for Yinka, Founder EarlyHer · {earlyHer.prepared}</p>
        <h1>{earlyHer.product}</h1>
        <span>{earlyHer.tagline}</span>
        <p className="eh-pitch">{earlyHer.pitch}</p>
      </header>

      {/* Problem */}
      <section className="case-list-section">
        <div className="section-heading" data-reveal>
          <p>The problem</p>
          <h2>{earlyHer.problem.headline}</h2>
          <span>{earlyHer.problem.subheadline}</span>
        </div>
        <div className="case-list" data-reveal>
          {earlyHer.problem.points.map((point) => (
            <article className="case-note" key={point}>
              <Check size={18} />
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Market */}
      <section className="case-list-section">
        <div className="section-heading" data-reveal>
          <p>Market opportunity</p>
          <h2>{earlyHer.market.headline}</h2>
        </div>
        <div className="eh-stat-grid" data-reveal>
          {earlyHer.market.stats.map((stat) => (
            <div className="eh-stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor landscape */}
      <section className="case-list-section">
        <div className="section-heading" data-reveal>
          <p>The landscape</p>
          <h2>Who else is in the room.</h2>
        </div>
        <p className="eh-competitor-statement" data-reveal>{earlyHer.competitorStatement}</p>
        <div className="eh-positioning-note" data-reveal>
          <p>{earlyHer.positioningNote}</p>
        </div>
        <EarlyHerCompetitorsCarousel onSoundCue={onSoundCue} />
      </section>

      {/* Photo carousel, The Vision */}
      <section className="case-list-section">
        <div className="section-heading" data-reveal>
          <p>The vision</p>
          <h2>What EarlyHer could look like in the world.</h2>
        </div>
        <EarlyHerPhotoCarousel onSoundCue={onSoundCue} />
      </section>

      {/* Approach */}
      <section className="case-grid" data-reveal>
        <div>
          <p className="eyebrow">The engagement</p>
          <h2>How I'm approaching this</h2>
        </div>
        <p>{earlyHer.intro}</p>
      </section>

      {/* Market context */}
      <section className="case-grid" data-reveal>
        <div>
          <p className="eyebrow">Market context</p>
          <h2>What this really costs</h2>
        </div>
        <div>
          <p>{earlyHer.marketContext.body}</p>
          <div className="eh-market-range" data-reveal>
            <span>{earlyHer.marketContext.rangeLabel}</span>
            <strong>{earlyHer.marketContext.range}</strong>
          </div>
        </div>
      </section>

      {/* Investor prep */}
      <section className="case-list-section">
        <div className="section-heading" data-reveal>
          <p>Investor readiness</p>
          <h2>{earlyHer.investorPrep.headline}</h2>
        </div>
        <div className="case-list" data-reveal>
          <article className="case-note">
            <Sparkles size={18} />
            <p>{earlyHer.investorPrep.forCustomers}</p>
          </article>
          <article className="case-note">
            <Sparkles size={18} />
            <p>{earlyHer.investorPrep.forInvestors}</p>
          </article>
        </div>
      </section>

      {/* Deliverables carousel */}
      <EarlyHerDeliverablesCarousel onSoundCue={onSoundCue} />

      {/* Pricing */}
      <section className="case-list-section eh-pricing-section">
        <div className="section-heading" data-reveal>
          <p>Investment</p>
          <h2>The breakdown.</h2>
        </div>
        <div className="eh-pricing-cards" data-reveal>
          <div className="eh-price-card">
            <span>{earlyHer.founderRateLabel}</span>
            <strong>{earlyHer.founderRate}</strong>
            <p>{earlyHer.founderRateNote}</p>
          </div>
          <div className="eh-price-card eh-price-card--deduct">
            <span>{earlyHer.referralLabel}</span>
            <strong>{earlyHer.referralDeduction}</strong>
            <p>{earlyHer.referralNote}</p>
          </div>
          <div className="eh-price-card eh-price-card--final">
            <span>{earlyHer.finalRateLabel}</span>
            <strong>{earlyHer.finalRate}</strong>
            <p>{earlyHer.finalRateNote}</p>
          </div>
        </div>
      </section>

      {/* Payment stages carousel */}
      <EarlyHerStagesCarousel onSoundCue={onSoundCue} />

      {/* Important notes */}
      <section className="case-list-section">
        <div className="section-heading" data-reveal>
          <p>To note</p>
          <h2>Important to understand.</h2>
        </div>
        <div className="case-list" data-reveal>
          {earlyHer.importantNotes.map((note) => (
            <article className="case-note" key={note}>
              <Check size={18} />
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="eh-cta no-print" data-reveal>
        <p>Proposal quotation is open for negotiation, let's finalize</p>
        <a
          href="https://wa.link/sbqf10"
          target="_blank"
          rel="noreferrer"
          className="primary-button"
          onClick={() => onSoundCue("button")}
        >
          Proceed  <ArrowUpRight size={15} />
        </a>
      </section>

      <p className="eh-attribution">Prepared by Esther Tsotso for Earlyher </p>
    </article>
  );
}

type WhyCardData = (typeof whyCards)[number];
type VideoCardData = WhyCardData & { video: { youtubeId: string } };

function WhyVideoCard({
  card,
  onVideoPlay,
  onVideoStop,
}: {
  card: VideoCardData;
  onVideoPlay: () => void;
  onVideoStop: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [active, setActive] = useState(false);
  const [credit, setCredit] = useState("");

  useEffect(() => {
    let mounted = true;
    const init = () => {
      if (!mounted || !containerRef.current || playerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: card.video.youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 0,
          controls: 1,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (!mounted) return;
            const data = playerRef.current?.getVideoData();
            if (data?.author) setCredit(data.author);
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === 1) {
              onVideoPlay();
            } else if (event.data === 2 || event.data === 0) {
              onVideoStop();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      init();
    } else {
      const check = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(check);
          init();
        }
      }, 150);
      return () => { mounted = false; clearInterval(check); };
    }

    return () => {
      mounted = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`why-card why-card--video${active ? " is-active" : ""}`}
      style={{ "--card-rotation": `${card.rotation}deg` } as CSSProperties}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      role="article"
      aria-label={card.label}
    >
      <div className="why-card-photo why-card-photo--video">
        <div ref={containerRef} className="why-card-video-target" />
      </div>
      <p className="why-card-label">{card.label}</p>
      {credit && (
        <p className="why-card-credit">
          <ArrowUpRight size={9} />
          {credit}
        </p>
      )}
      <p className="why-card-detail">{card.detail}</p>
    </div>
  );
}

function WhyCard({ card }: { card: WhyCardData }) {
  const [active, setActive] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (card.photos.length <= 1) return;
    if (!active) {
      intervalRef.current = setInterval(
        () => setPhotoIndex((i) => (i + 1) % card.photos.length),
        3000,
      );
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, card.photos.length]);

  const src = card.photos[photoIndex] ?? null;

  return (
    <div
      className={`why-card${active ? " is-active" : ""}`}
      style={{ "--card-rotation": `${card.rotation}deg` } as CSSProperties}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      role="article"
      aria-label={card.label}
    >
      <div className="why-card-photo">
        {src ? (
          <img key={src} src={src} alt={card.label} draggable={false} />
        ) : (
          <span className="why-card-placeholder" />
        )}
      </div>
      <p className="why-card-label">{card.label}</p>
      <p className="why-card-detail">{card.detail}</p>
    </div>
  );
}

function WhySection({
  onVideoPlay: _onVideoPlay,
  onVideoStop: _onVideoStop,
}: {
  onVideoPlay: () => void;
  onVideoStop: () => void;
}) {
  return null;
}

function About() {
  const icons = [Palette, Code2, Zap, Sparkles];

  return (
    <section className="about section-anchor" id="about">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Teaching, communication, engineering, and research are not separate careers to me.
          </>
        }
        copy="They are different ways of doing the same work: understanding people, making complexity clearer, and building support that leaves them more capable."
      />
      <div className="about-narrative" data-reveal>
        <p>
          The classroom taught me to notice when an explanation is not landing. Broadcasting taught
          me to listen, research, and translate ideas without flattening them. Engineering gave me a
          way to turn those observations into systems people can actually use.
        </p>
        <p>
          AI brought the threads together. It gave me a new design material, but it also raised a
          harder responsibility: deciding when assistance supports learning and when it quietly
          removes the effort, judgment, or human connection learning depends on.
        </p>
        <p>
          That is the direction I am on now: research that can inform responsible learning systems,
          and products that make the research concrete enough to question, observe, and improve.
        </p>
      </div>
      <div className="craft-grid">
        {craftCards.map((card, index) => {
          const Icon = icons[index];
          return (
            <article className="craft-card" key={card.title} data-reveal>
              <Icon size={20} />
              <div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <span>{card.detail}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Resume({
  onNavigate,
  onSoundCue,
}: {
  onNavigate: (path: string) => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  return (
    <section className="resume section-anchor" id="resume">
      <SectionHeading
        eyebrow="Proof"
        title="A career that compounds."
        copy="The formal record behind the narrative, from early teaching and broadcasting to software engineering, AI products, and adaptive-learning research."
      />

      <div
        className="experience-rail"
        data-reveal
        tabIndex={0}
        role="region"
        aria-label="Experience highlights, scrollable"
      >
        {resumeHighlights.map((item, index) => (
          <article className="experience-card" key={`${item.org}-${item.title}`}>
            <span className="rail-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <span className="badge">{item.type}</span>
              <h3>{item.title}</h3>
              <p className="muted-line">
                {item.period} / {item.org}
              </p>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="resume-proof-heading">
        <SectionHeading
          eyebrow="Learning & recognition"
          title="Formal learning across public service, software, and AI."
          copy="Education and recognition that support a practice built across disciplines rather than inside a single lane."
        />
      </div>

      <div className="resume-lower">
        <div className="resume-column" data-reveal>
          <div className="resume-subhead">
            <h3>Education</h3>
          </div>
          <div className="mini-card-grid">
            {education.map((item) => (
              <article className="mini-card" key={item.title}>
                <span>{item.meta}</span>
                <strong>{item.title}</strong>
                <p>
                  {item.period} / {item.org}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="resume-column" data-reveal>
          <div className="resume-subhead">
            <h3>Badge of honor</h3>
            <a
              href={profile.certificationsUrl}
              onClick={(event) => {
                event.preventDefault();
                onSoundCue("button");
                onNavigate("/certifications");
              }}
            >
              View all certifications <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="mini-card-grid">
            {credentials.map((credential) => (
              <article className="mini-card" key={credential}>
                <span>Recognition</span>
                <strong>{credential}</strong>
                <p>
                  Awarded for being the best Frontend Engineering student with
                  the overall highest score in the School of Computing during
                  the one-year diploma at AltSchool Africa.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  // Slow air bubbles drifting up through the water and fading — scattered at
  // different depths and sizes so the water feels inhabited, not patterned.
  const bubbles = useMemo(
    () =>
      Array.from({ length: 17 }, (_, id) => {
        const time = 6 + Math.random() * 8; // 6–14s (slow drift)
        return {
          id,
          size: 4 + Math.random() * 13, // 4–17px
          position: 3 + Math.random() * 94, // 3–97%
          depth: 4 + Math.random() * 58, // px above the sea floor it starts
          time,
          delay: -(Math.random() * time), // negative → staggered on load
          rise: 90 + Math.random() * 130, // px risen before fading out
          drift: (Math.random() - 0.5) * 36, // sideways wander
        };
      }),
    [],
  );

  return (
    <footer className="footer section-anchor" id="contact">
      <div className="footer-inner">
        <p className="eyebrow" data-reveal>
          Contact
        </p>
        <h2 data-reveal>
          Let's
          <span>
            Connect
          </span>
        </h2>
        <p data-reveal>
          Open to educational AI research collaborations, adaptive-learning product work, and teams
          that care about learner agency, responsible assistance, and human-centred technology.
        </p>
        <div className="contact-actions" data-reveal>
          <a
            className="contact-secondary"
            href={profile.links.calendar}
            target="_blank"
            rel="noreferrer"
            onClick={() => onSoundCue("button")}
          >
            Get in touch
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <div>
            <small>(c) 2026 - Built by Esther Tsotso</small>
          </div>
          <SocialLinks />
        </div>
      </div>
      {/* The ocean: layered rolling waves fading into the page background */}
      <div className="footer-sea" aria-hidden="true">
        <svg
          className="footer-waves"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="footer-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="footer-wave-parallax">
            <use href="#footer-wave" x="48" y="0" className="fw fw1" />
            <use href="#footer-wave" x="48" y="3" className="fw fw2" />
            <use href="#footer-wave" x="48" y="5" className="fw fw3" />
            <use href="#footer-wave" x="48" y="7" className="fw fw4" />
          </g>
        </svg>
        <div className="footer-sea-body">
          {bubbles.map((b) => (
            <span
              key={b.id}
              className="footer-bubble"
              style={
                {
                  "--size": `${b.size}px`,
                  "--position": `${b.position}%`,
                  "--depth": `${b.depth}px`,
                  "--time": `${b.time}s`,
                  "--delay": `${b.delay}s`,
                  "--rise": `${b.rise}px`,
                  "--drift": `${b.drift}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

function PunWord({ mistake, correction }: { mistake: string; correction: string }) {
  const [isCorrected, setIsCorrected] = useState(false);

  return (
    <button
      type="button"
      className={`typo-reveal${isCorrected ? " is-corrected" : ""}`}
      aria-label={`${mistake}. Tap to reveal ${correction}.`}
      aria-pressed={isCorrected}
      onClick={() => setIsCorrected((current) => !current)}
    >
      <span className="typo-copy typo-copy-original" aria-hidden="true">
        {mistake}
      </span>
      <span className="typo-copy typo-copy-corrected" aria-hidden="true">
        {correction}
      </span>
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{copy}</span>
    </div>
  );
}

export default App;
