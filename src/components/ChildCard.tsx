import { useEffect, useRef, useState, type CSSProperties } from 'react';
import confetti from 'canvas-confetti';
import type { ChildConfig } from '../types';

interface ChildCardProps {
  child: ChildConfig;
  points: number;
  maxPoints: number;
  onAdd: () => void;
  onSubtract: () => void;
}

export default function ChildCard({
  child,
  points,
  maxPoints,
  onAdd,
  onSubtract,
}: ChildCardProps) {
  const [heartPulse, setHeartPulse] = useState(false);
  const [animalBounce, setAnimalBounce] = useState(false);
  const celebratedRef = useRef(false);
  const reachedGoal = points >= maxPoints;

  useEffect(() => {
    if (reachedGoal && !celebratedRef.current) {
      celebratedRef.current = true;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ['circle', 'square'],
        scalar: 1.1,
      });
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.5 },
        shapes: ['circle'],
        scalar: 0.9,
        colors: ['#f472b6', '#fb923c', '#60a5fa', '#fbbf24'],
      });
    }

    if (!reachedGoal) {
      celebratedRef.current = false;
    }
  }, [reachedGoal]);

  const handleAdd = () => {
    onAdd();
    setHeartPulse(true);
    setAnimalBounce(true);
    window.setTimeout(() => setHeartPulse(false), 600);
    window.setTimeout(() => setAnimalBounce(false), 500);
  };

  const progress = maxPoints > 0 ? Math.min((points / maxPoints) * 100, 100) : 0;

  return (
    <article
      className="child-card"
      style={
        {
          '--theme': child.themeColor,
          '--theme-light': child.themeColorLight,
          '--theme-dark': child.themeColorDark,
        } as CSSProperties
      }
    >
      <span className="child-card__watermark" aria-hidden="true">
        {child.animal}
      </span>

      <header className="child-card__header">
        <div className={`child-card__avatar ${animalBounce ? 'child-card__avatar--bounce' : ''}`}>
          {child.animal}
        </div>
        <h2 className="child-card__name">
          <span className={`child-card__heart ${heartPulse ? 'child-card__heart--pulse' : ''}`}>
            ♥
          </span>
          {child.name}
          <span className={`child-card__heart ${heartPulse ? 'child-card__heart--pulse' : ''}`}>
            ♥
          </span>
        </h2>
      </header>

      <div className="child-card__score">{points}</div>

      <div className="child-card__progress-wrap">
        <div className="child-card__progress-label">
          {points} / {maxPoints}
        </div>
        <div className="child-card__progress-track">
          <div
            className="child-card__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {reachedGoal && <p className="child-card__celebration">Μπράβο! 🎉</p>}

      <div className="child-card__actions">
        <button
          type="button"
          className="child-card__btn child-card__btn--minus"
          onClick={onSubtract}
          disabled={points <= 0}
          aria-label={`Αφαίρεση πόντου από ${child.name}`}
        >
          −1
        </button>
        <button
          type="button"
          className="child-card__btn child-card__btn--plus"
          onClick={handleAdd}
          aria-label={`Προσθήκη πόντου σε ${child.name}`}
        >
          +1
        </button>
      </div>
    </article>
  );
}
