import { useEffect, useRef, useState, type CSSProperties } from 'react';
import confetti from 'canvas-confetti';
import type { ChildConfig } from '../types';
import {
  formatFeedingDateTime,
  getNextFeedingAt,
  isFeedingOverdue,
} from '../utils/feeding';

interface ChildCardProps {
  child: ChildConfig;
  points: number;
  maxPoints: number;
  onAdd: () => void;
  onSubtract: () => void;
  lastFedAt?: string | null;
  lastMilkMl?: number | null;
  onFeed?: (milkMl: number) => void;
  onResetFeeding?: () => void;
}

export default function ChildCard({
  child,
  points,
  maxPoints,
  onAdd,
  onSubtract,
  lastFedAt,
  lastMilkMl,
  onFeed,
  onResetFeeding,
}: ChildCardProps) {
  const [heartPulse, setHeartPulse] = useState(false);
  const [animalBounce, setAnimalBounce] = useState(false);
  const [feedPulse, setFeedPulse] = useState(false);
  const [milkDraft, setMilkDraft] = useState(() =>
    lastMilkMl != null ? String(lastMilkMl) : '',
  );
  const [now, setNow] = useState(() => Date.now());
  const celebratedRef = useRef(false);
  const reachedGoal = points >= maxPoints;
  const showFeeding = child.id === 'alexandros' && onFeed !== undefined;

  useEffect(() => {
    if (!showFeeding) return;

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, [showFeeding]);

  useEffect(() => {
    if (lastMilkMl != null) {
      setMilkDraft(String(lastMilkMl));
    }
  }, [lastMilkMl]);

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

  const handleFeed = () => {
    const trimmed = milkDraft.trim();
    if (trimmed === '') {
      window.alert('Βάλε ποσότητα γάλατος σε ml.');
      return;
    }

    const parsed = Number.parseInt(trimmed, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
      window.alert('Η ποσότητα γάλατος πρέπει να είναι θετικός αριθμός σε ml.');
      return;
    }

    onFeed?.(parsed);
    setFeedPulse(true);
    setAnimalBounce(true);
    window.setTimeout(() => setFeedPulse(false), 600);
    window.setTimeout(() => setAnimalBounce(false), 500);
  };

  const handleResetFeeding = () => {
    const confirmed = window.confirm('Να μηδενισθούν η ώρα σίτισης και τα ml γάλατος;');
    if (confirmed) {
      onResetFeeding?.();
      setMilkDraft('');
    }
  };

  const progress = maxPoints > 0 ? Math.min((points / maxPoints) * 100, 100) : 0;
  const lastFedDate = lastFedAt ? new Date(lastFedAt) : null;
  const nextFeedingDate = getNextFeedingAt(lastFedAt ?? null);
  const feedingOverdue = isFeedingOverdue(lastFedAt ?? null, now);

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

      {showFeeding && (
        <section className="child-card__feeding" aria-label="Σίτιση Αλέξανδρου">
          <button
            type="button"
            className="child-card__feeding-reset"
            onClick={handleResetFeeding}
            disabled={!lastFedAt}
            aria-label="Επαναφορά ώρας σίτισης"
          >
            Επαναφορά
          </button>

          <div className="child-card__feeding-times">
            <p className="child-card__feeding-row">
              <span className="child-card__feeding-label">Τελευταία σίτιση</span>
              <span className="child-card__feeding-value">
                {lastFedDate ? formatFeedingDateTime(lastFedDate) : '—'}
              </span>
            </p>
            <p
              className={`child-card__feeding-row ${
                feedingOverdue ? 'child-card__feeding-row--overdue' : ''
              }`}
            >
              <span className="child-card__feeding-label">Επόμενη σίτιση</span>
              <span className="child-card__feeding-value">
                {nextFeedingDate ? formatFeedingDateTime(nextFeedingDate) : '—'}
              </span>
            </p>
            <p className="child-card__feeding-row">
              <span className="child-card__feeding-label">Τελευταίο γάλα</span>
              <span className="child-card__feeding-value">
                {lastMilkMl != null ? `${lastMilkMl} ml` : '—'}
              </span>
            </p>
          </div>

          {feedingOverdue && (
            <p className="child-card__feeding-alert">Ώρα για σίτιση! 🍼</p>
          )}

          <div className="child-card__feeding-input">
            <label className="child-card__feeding-input-label" htmlFor={`milk-ml-${child.id}`}>
              Γάλα (ml)
            </label>
            <input
              id={`milk-ml-${child.id}`}
              className="child-card__feeding-input-field"
              type="number"
              min={1}
              max={1000}
              inputMode="numeric"
              placeholder="π.χ. 120"
              value={milkDraft}
              onChange={(event) => setMilkDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleFeed();
                }
              }}
            />
          </div>

          <button
            type="button"
            className={`child-card__btn child-card__btn--feed ${
              feedPulse ? 'child-card__btn--feed-pulse' : ''
            }`}
            onClick={handleFeed}
            aria-label="Καταγραφή σίτισης Αλέξανδρου"
          >
            🍼 Έφαγε!
          </button>
        </section>
      )}
    </article>
  );
}
