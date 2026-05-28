import { type CSSProperties, type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  Code2,
  Copy,
  Download,
  Github,
  Instagram,
  Linkedin,
  Moon,
  Palette,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import {
  craftCards,
  credentials,
  education,
  profile,
  projects,
  resumeHighlights,
  tools,
} from "./portfolioData";

type Theme = "dark" | "light";

const themeStorageKey = "esther-portfolio-theme";
const soundStorageKey = "esther-portfolio-sound";
const ambientTrackPath = "/assets/mixkit-island-beat-250.mp3";
const clickSoundPath = "/assets/mixkit-coins-handling-1939.wav";
const themeSoundPath = "/assets/mixkit-sand-swish-1494.wav";

type SoundKind = "nav" | "theme" | "project" | "copy" | "contact" | "button";
type ThemeRipple = { x: number; y: number; color: string; id: number } | null;

function createAudioController() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  const context = new AudioContextClass();
  const master = context.createGain();
  const music = new Audio(ambientTrackPath);
  const click = new Audio(clickSoundPath);
  const themeSfx = new Audio(themeSoundPath);

  master.gain.value = 0.22;
  master.connect(context.destination);
  music.loop = true;
  music.preload = "auto";
  music.volume = 0;
  click.preload = "auto";
  click.volume = 0.34;
  themeSfx.preload = "auto";
  themeSfx.volume = 0.42;

  const play = (kind: SoundKind) => {
    if (context.state === "suspended") void context.resume();

    if (kind === "button" || kind === "theme") {
      const sample = kind === "theme" ? themeSfx : click;
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

  const setAmbient = (enabled: boolean) => {
    if (context.state === "suspended") void context.resume();
    const target = enabled ? 0.28 : 0;
    const step = enabled ? 0.018 : -0.022;

    if (enabled) {
      void music.play();
    }

    const fade = window.setInterval(() => {
      const next = Math.max(0, Math.min(target, music.volume + step));
      music.volume = next;

      if (next === target) {
        window.clearInterval(fade);
        if (!enabled) {
          music.pause();
        }
      }
    }, 35);
  };

  return {
    context,
    play,
    setAmbient,
    close: () => {
      music.pause();
      click.pause();
      themeSfx.pause();
      void context.close();
    },
  };
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

function App() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<ReturnType<typeof createAudioController> | null>(null);
  const themeTimersRef = useRef<number[]>([]);
  const [themeRipple, setThemeRipple] = useState<ThemeRipple>(null);
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem(soundStorageKey) === "on");
  const [copied, setCopied] = useState(false);
  const [path, setPath] = useState(() => window.location.pathname);
  const [theme, setTheme] = useState<Theme>(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get("theme");
    if (requestedTheme === "light" || requestedTheme === "dark") {
      return requestedTheme;
    }
    const saved = localStorage.getItem(themeStorageKey);
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      audioRef.current?.close();
      themeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateProjectStack = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-feature"));
        if (!cards.length) return;

        cards.forEach((card, index) => {
          const nextCard = cards[index + 1];
          if (!nextCard) {
            card.style.opacity = "1";
            return;
          }

          const stickyTop = parseFloat(window.getComputedStyle(card).top || "76");
          const nextTop = nextCard.getBoundingClientRect().top;
          const fadeStart = stickyTop + 180;
          const fadeEnd = stickyTop + 24;
          const progress = Math.max(0, Math.min(1, (fadeStart - nextTop) / (fadeStart - fadeEnd)));
          card.style.opacity = `${1 - progress * 0.42}`;
        });
      });
    };

    updateProjectStack();
    window.addEventListener("scroll", updateProjectStack, { passive: true });
    window.addEventListener("resize", updateProjectStack);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProjectStack);
      window.removeEventListener("resize", updateProjectStack);
      document.querySelectorAll<HTMLElement>(".project-feature").forEach((card) => {
        card.style.opacity = "";
      });
    };
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
        progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
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
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!spotlight || !canHover || reduceMotion) return;

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

    const moveSpotlight = (event: PointerEvent) => {
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
    window.addEventListener("pointerleave", hideSpotlight);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveSpotlight);
      window.removeEventListener("pointerleave", hideSpotlight);
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
    audio.setAmbient(true);
    audio.play(kind);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    const audio = ensureAudio();
    if (!audio) return;
    audio.setAmbient(next);
    if (next) audio.play("button");
    setSoundEnabled(next);
    localStorage.setItem(soundStorageKey, next ? "on" : "off");
  };

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
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

    setThemeRipple({
      x,
      y,
      color: nextTheme === "light" ? "#f5fbff" : "#01050f",
      id: Date.now(),
    });
    themeTimersRef.current = [
      window.setTimeout(() => setTheme(nextTheme), 430),
      window.setTimeout(() => {
        setThemeRipple(null);
        themeTimersRef.current = [];
      }, 1040),
    ];
  };

  const copyEmail = async () => {
    playSound("button");
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const navigateTo = (nextPath: string) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeProjectSlug = path.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const activeProject = projects.find((project) => project.slug === activeProjectSlug);

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
        soundEnabled={soundEnabled}
        onThemeToggle={toggleTheme}
        onSoundToggle={toggleSound}
        onSoundCue={playSound}
      />
      <main className="site-shell">
        {activeProject ? (
          <ProjectDetail project={activeProject} onBack={() => navigateTo("/")} onSoundCue={playSound} />
        ) : (
          <>
            <Hero onSoundCue={playSound} />
            <Tools />
            <Projects onNavigate={navigateTo} onSoundCue={playSound} />
            <About />
            <Resume />
            <Footer copied={copied} onCopyEmail={copyEmail} onSoundCue={playSound} />
          </>
        )}
      </main>
    </>
  );
}

function Nav({
  theme,
  themeLabel,
  soundEnabled,
  onThemeToggle,
  onSoundToggle,
  onSoundCue,
}: {
  theme: Theme;
  themeLabel: string;
  soundEnabled: boolean;
  onThemeToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  onSoundToggle: () => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  return (
    <header className="nav-wrap">
      <a href="/" className="brand-mark" aria-label="Esther Tsotso home" onClick={() => onSoundCue("button")}>
        {profile.shortName}
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/#projects" onClick={() => onSoundCue("button")}>Projects</a>
        <a href="/#about" onClick={() => onSoundCue("button")}>About</a>
        <a href={profile.cvUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
          Resume
        </a>
        <a href="/#contact" onClick={() => onSoundCue("button")}>Contact</a>
      </nav>
      <div className="nav-controls">
        <button
          className={soundEnabled ? "sound-toggle" : "sound-toggle needs-attention"}
          aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
          title={soundEnabled ? "Turn sound off" : "Turn sound on"}
          onClick={onSoundToggle}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
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

function Hero({ onSoundCue }: { onSoundCue: (kind: SoundKind) => void }) {
  return (
    <section className="hero section-anchor" id="home">
      <div className="hero-grid">
        <div className="hero-main">
          <p className="eyebrow" data-reveal>
            Frontend Maestro - Problem solver - Product thinker
          </p>
          <h1 data-reveal>
            <span>Esther</span>
            <span className="accent-line">Tsotso.</span>
          </h1>
        </div>

        <aside className="hero-side" data-reveal>
          <p>
            Hi there, I'm a frontend developer from Nigeria who solves product problems with frontend engineering, product intuition,
            and user empathy. I focus on building experiences that feels human and well thought out.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects" onClick={() => onSoundCue("button")}>
              View work
            </a>
            <a className="secondary-button" href={`mailto:${profile.email}`} onClick={() => onSoundCue("button")}>
              Get in touch
            </a>
          </div>
          <SocialLinks compact />
        </aside>
      </div>

      <div className="hero-footnote" data-reveal>
        <div className="portrait-chip">
          <img src={profile.image} alt="Esther Bawo Tsotso" />
          <span>I care about your product leeving a long lasting impression 😉😏</span>
        </div>
        <a href={profile.cvUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
          <Download size={16} />
          Download CV
        </a>
      </div>
    </section>
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
    </div>
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
  return (
    <section className="projects section-anchor" id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Problems turned into usable products."
        copy="Each project starts with a real user or product friction, then moves through technical decisions, interface states, and delivery."
      />
      <div className="project-stack">
        {projects.map((project, index) => (
          <article
            className="project-feature"
            key={project.name}
            style={{ "--stack-index": index } as CSSProperties}
            onPointerEnter={() => onSoundCue("project")}
          >
            <div className="project-copy">
              <div className="project-topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.role}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="story-caption">{project.story}</p>
              <div className="tags">
                {project.tech.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-actions">
                <button type="button" onClick={() => { onSoundCue("button"); onNavigate(`/work/${project.slug}`); }}>
                  Case study <ArrowUpRight size={15} />
                </button>
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
                    Live preview <ArrowUpRight size={15} />
                  </a>
                ) : null}
                {project.codeUrl ? (
                  <a href={project.codeUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
                    Codebase <Github size={15} />
                  </a>
                ) : null}
              </div>
            </div>
            <a
              className="project-image"
              href={`/work/${project.slug}`}
              aria-label={`Open ${project.name} case study`}
              onClick={(event) => {
                event.preventDefault();
                onSoundCue("button");
                onNavigate(`/work/${project.slug}`);
              }}
            >
              <img src={project.image} alt={`${project.name} preview`} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectDetail({
  project,
  onBack,
  onSoundCue,
}: {
  project: (typeof projects)[number];
  onBack: () => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
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
        <p className="eyebrow">{project.role} / {project.year}</p>
        <h1>{project.name}</h1>
        <span>{project.description}</span>
        <div className="case-actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={() => onSoundCue("button")}>
              View live <ArrowUpRight size={15} />
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

      <section className="case-stack">
        <p className="eyebrow">Tech stack</p>
        <div className="tags">
          {project.tech.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>
    </article>
  );
}

function About() {
  const icons = [Palette, Code2, Zap, Sparkles];

  return (
    <section className="about section-anchor" id="about">
      <SectionHeading
        eyebrow="About"
        title="I care about the problem before the interface."
        copy="The story is not just that I write codes. It is that I pay attention to the user, the product goal, the flow, and the technical path that makes a solution dependable."
      />
      <div className="about-grid">
        <div className="about-narrative" data-reveal>
          <p>
            I started with curiosity about how useful digital products are built, then
            learned to turn product requirements into frontend systems people can trust.
            Today my work moves between problem framing, product thinking, user empathy,
            and the engineering details that keep an experience reliable.
          </p>
          <p>
            I like projects where the solution gets clearer as you use it. Whether it is
            a checkout flow, a ticket generator, an AI interface, or a mobile verification
            product, I want users to feel guided rather than dropped into a screen.
          </p>
        </div>
        <div className="craft-grid">
          {craftCards.map((card, index) => {
            const Icon = icons[index];
            return (
              <article className="craft-card" key={card.title} data-reveal>
                <Icon size={22} />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <span>{card.detail}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="resume section-anchor" id="resume">
      <SectionHeading
        eyebrow="Proof"
        title="Experience that backs up the story."
        copy="A curated resume layer, focused on what each chapter proves about Esther's ability to solve, collaborate, and ship."
      />

      <div className="experience-rail" data-reveal>
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
          title="Education with one standout award."
          copy="Formal training and the recognition that shows the same care I bring to frontend engineering delivery."
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
            <a href={profile.certificationsUrl} target="_blank" rel="noreferrer">
              View all certifications <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="mini-card-grid">
            {credentials.map((credential) => (
              <article className="mini-card" key={credential}>
                <span>Frontend award</span>
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

function Footer({
  copied,
  onCopyEmail,
  onSoundCue,
}: {
  copied: boolean;
  onCopyEmail: () => void;
  onSoundCue: (kind: SoundKind) => void;
}) {
  return (
    <footer className="footer section-anchor" id="contact">
      <p className="eyebrow" data-reveal>
        Contact
      </p>
      <h2 data-reveal>
        Have a problem worth solving?
        <span>Let&apos;s shape the product.</span>
      </h2>
      <p data-reveal>
        Open to frontend roles, product collaborations, and user-centered problems
        that need clear thinking, technical execution, and product care.
      </p>
      <div className="contact-actions" data-reveal>
        <button className="contact-primary" type="button" onClick={onCopyEmail}>
          {copied ? "Email copied" : "Copy email"}
          <span>
            {copied ? <Check size={17} /> : <Copy size={17} />}
          </span>
        </button>
        <a
          className="contact-secondary"
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={() => onSoundCue("button")}
        >
          Connect on LinkedIn
          <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="footer-bottom">
        <div>
          <strong>{profile.name}</strong>
          <small>(c) 2026 - Built by Esther Tsotso</small>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
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
