import { useEffect, useState } from 'react';

interface SettingsBarProps {
  maxPoints: number;
  onMaxPointsChange: (value: number) => void;
  onReset: () => void;
}

export default function SettingsBar({
  maxPoints,
  onMaxPointsChange,
  onReset,
}: SettingsBarProps) {
  const [draft, setDraft] = useState(String(maxPoints));

  useEffect(() => {
    setDraft(String(maxPoints));
  }, [maxPoints]);

  const commitMaxPoints = () => {
    const trimmed = draft.trim();
    if (trimmed === '') {
      setDraft(String(maxPoints));
      return;
    }

    const parsed = Number.parseInt(trimmed, 10);
    if (Number.isNaN(parsed)) {
      setDraft(String(maxPoints));
      return;
    }

    onMaxPointsChange(parsed);
  };

  const handleReset = () => {
    const confirmed = window.confirm('Να μηδενιστούν όλοι οι βαθμοί;');
    if (confirmed) {
      onReset();
    }
  };

  return (
    <section className="settings-bar">
      <div className="settings-bar__group">
        <label className="settings-bar__label" htmlFor="max-points">
          Στόχος πόντων
        </label>
        <input
          id="max-points"
          className="settings-bar__input"
          type="number"
          min={1}
          max={100}
          inputMode="numeric"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitMaxPoints}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur();
            }
          }}
        />
      </div>
      <button type="button" className="settings-bar__reset" onClick={handleReset}>
        Νέος γύρος
      </button>
    </section>
  );
}
