import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { intuitionRounds } from "./intuitionData";
import "./intuition.css";

export function IntuitionGame({ onInteract }: { onInteract: () => void }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(() => intuitionRounds.map(() => null));
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusNextHeadingRef = useRef(false);
  const round = intuitionRounds[roundIndex];
  const selected = answers[roundIndex];
  const completedCount = answers.filter((answer) => answer !== null).length;

  useEffect(() => {
    if (focusNextHeadingRef.current) {
      headingRef.current?.focus({ preventScroll: true });
      focusNextHeadingRef.current = false;
    }
  }, [roundIndex, finished]);

  const choose = (optionIndex: number) => {
    onInteract();
    setAnswers((current) => current.map((answer, index) => index === roundIndex ? optionIndex : answer));
  };

  const next = () => {
    if (selected === null) return;
    onInteract();
    focusNextHeadingRef.current = true;
    if (roundIndex === intuitionRounds.length - 1) {
      setFinished(true);
    } else {
      setRoundIndex((index) => index + 1);
    }
  };

  const back = () => {
    if (roundIndex === 0) return;
    onInteract();
    focusNextHeadingRef.current = true;
    setRoundIndex((index) => index - 1);
  };

  const restart = () => {
    onInteract();
    focusNextHeadingRef.current = true;
    setAnswers(intuitionRounds.map(() => null));
    setRoundIndex(0);
    setFinished(false);
  };

  return (
    <section className="intuition-section now-section section-anchor" id="intuition" aria-labelledby="intuition-title">
      <div className="index-section-heading" data-reveal>
        <div>
          <span className="index-kicker">Go with your gut</span>
          <h2 id="intuition-title">Test your intuition.</h2>
        </div>
        <div>
          <p className="intuition-intro">Two lies. One truth. How well have you read me?</p>
          <p>{intuitionRounds.length} rounds about the person behind the work. Pick the statement that feels true in each one.</p>
        </div>
      </div>

      <div className="intuition-game" data-reveal>
        <div
          className="intuition-progress"
          role="progressbar"
          aria-label="Game progress"
          aria-valuemin={0}
          aria-valuemax={intuitionRounds.length}
          aria-valuenow={completedCount}
          aria-valuetext={`${completedCount} of ${intuitionRounds.length} rounds chosen`}
        >
          {intuitionRounds.map((item, index) => (
            <span
              key={item.id}
              className={`${answers[index] !== null ? "is-complete" : ""}${!finished && index === roundIndex ? " is-current" : ""}`}
              aria-hidden="true"
            />
          ))}
        </div>

        {finished ? (
          <div className="intuition-finish intuition-enter" key="finish">
            <span className="intuition-finish-icon" aria-hidden="true"><MessageCircle size={30} /></span>
            <p className="intuition-kicker">The plot twist</p>
            <h3 ref={headingRef} tabIndex={-1}>You’ve gotta ask me in person.</h3>
            <p>Your guesses are conversation starters. Bring one up when we meet—there’s a story behind the answer.</p>
            <div className="intuition-finish-actions">
              <a className="intuition-connect" href="#contact" onClick={onInteract}>
                Let’s connect <ArrowRight size={17} aria-hidden="true" />
              </a>
              <button className="intuition-replay" type="button" onClick={restart}>
                <RotateCcw size={14} aria-hidden="true" /> Play again
              </button>
            </div>
            <details className="intuition-recap">
              <summary>Your conversation starters <ChevronDown size={15} aria-hidden="true" /></summary>
              <ol>
                {intuitionRounds.map((item, index) => (
                  <li key={item.id}>
                    <span>{item.category}</span>
                    <p>{item.options[answers[index] ?? 0]}</p>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        ) : (
          <>
            <div className="intuition-round intuition-enter" key={round.id}>
              <div className="intuition-round-meta">
                <p className="intuition-kicker">Round {roundIndex + 1} of {intuitionRounds.length}</p>
                <span className="intuition-rule">2 lies <span aria-hidden="true">·</span> 1 truth</span>
              </div>
              <h3 ref={headingRef} tabIndex={-1}>{round.category}</h3>
              <fieldset className="intuition-options">
                <legend>Pick the truth.</legend>
                {round.options.map((option, index) => (
                  <label className={`intuition-option${selected === index ? " is-selected" : ""}`} key={option}>
                    <input
                      type="radio"
                      name={`intuition-${round.id}`}
                      value={index}
                      checked={selected === index}
                      onChange={() => choose(index)}
                    />
                    <span className="intuition-option-letter" aria-hidden="true">
                      {selected === index ? <Check size={17} /> : String.fromCharCode(65 + index)}
                    </span>
                    <span className="intuition-option-copy">{option}</span>
                  </label>
                ))}
              </fieldset>
            </div>
            <div className="intuition-navigation">
              <button className="intuition-back" type="button" disabled={roundIndex === 0} onClick={back}>
                <ArrowLeft size={15} aria-hidden="true" /> Back
              </button>
              <button className="intuition-next" type="button" disabled={selected === null} onClick={next}>
                {roundIndex === intuitionRounds.length - 1 ? "Lock in my guesses" : "Next round"}
                {roundIndex === intuitionRounds.length - 1 ? <Sparkles size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
