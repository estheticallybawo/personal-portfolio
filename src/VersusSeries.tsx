import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Swords } from "lucide-react";
import { versusMatchups } from "./versusData";
import "./versus.css";

export function VersusSeries({ onInteract }: { onInteract: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [choices, setChoices] = useState<Array<number | null>>(() => versusMatchups.map(() => null));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusNextHeadingRef = useRef(false);
  const matchup = versusMatchups[activeIndex];
  const selected = choices[activeIndex];

  useEffect(() => {
    if (focusNextHeadingRef.current) {
      headingRef.current?.focus({ preventScroll: true });
      focusNextHeadingRef.current = false;
    }
  }, [activeIndex]);

  const choose = (index: number) => {
    onInteract();
    setChoices((current) => current.map((choice, itemIndex) => itemIndex === activeIndex ? index : choice));
  };

  const move = (direction: -1 | 1) => {
    onInteract();
    focusNextHeadingRef.current = true;
    setActiveIndex((index) => (index + direction + versusMatchups.length) % versusMatchups.length);
  };

  return (
    <section className="versus-section now-section section-anchor" id="this-versus-that" aria-labelledby="versus-title">
      <div className="index-section-heading" data-reveal>
        <div>
          <span className="index-kicker">Pick a side</span>
          <h2 id="versus-title">This versus that.</h2>
        </div>
        <div>
          <p>A few friendly debates. Choose your side, then see where I stand.</p>
          <p>Bring your counterargument when we meet.</p>
        </div>
      </div>

      <div className="versus-series" role="region" aria-roledescription="carousel" aria-label="This versus that matchups" data-reveal>
        <article className="versus-card" id="versus-card" aria-labelledby="versus-matchup-title">
          <div className="versus-meta">
            <span className="versus-icon" aria-hidden="true"><Swords size={19} /></span>
            <p aria-live="polite" aria-atomic="true">Matchup {activeIndex + 1} of {versusMatchups.length}</p>
          </div>
          <div className="versus-enter" key={matchup.id}>
            <h3 id="versus-matchup-title" ref={headingRef} tabIndex={-1}>{matchup.title}</h3>
            <p className="versus-prompt" id="versus-prompt">{matchup.prompt}</p>
            <div className="versus-options" role="group" aria-label="Choose your side" aria-describedby="versus-prompt">
              {matchup.options.map((option, index) => (
                <button
                  className={`versus-option${selected === index ? " is-selected" : ""}`}
                  type="button"
                  key={option}
                  aria-pressed={selected === index}
                  aria-controls="versus-answer"
                  onClick={() => choose(index)}
                >
                  <span>{option}</span>
                  <span className="versus-choice-indicator" aria-hidden="true">
                    {selected === index ? <Check size={15} /> : <ArrowRight size={15} />}
                  </span>
                </button>
              ))}
              <span className="versus-divider" aria-hidden="true">vs</span>
            </div>

            <div className={`versus-answer${selected !== null ? " is-revealed" : ""}`} id="versus-answer" role="status" aria-live="polite" aria-atomic="true">
              {selected === null ? (
                <p className="versus-hint">Your move. Pick a side to see mine.</p>
              ) : (
                <div className="versus-enter">
                  <p className="versus-answer-kicker">My pick</p>
                  <p className="versus-answer-pick">{matchup.answer}</p>
                  {"reason" in matchup && <p className="versus-reason">{matchup.reason}</p>}
                </div>
              )}
            </div>
          </div>
          <div className="versus-navigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous matchup" aria-controls="versus-card">
              <ArrowLeft size={17} aria-hidden="true" />
            </button>
            <div className="versus-dots" aria-hidden="true">
              {versusMatchups.map((item, index) => <span key={item.id} className={index === activeIndex ? "is-active" : ""} />)}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Next matchup" aria-controls="versus-card">
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
