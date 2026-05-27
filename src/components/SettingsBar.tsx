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
          value={maxPoints}
          onChange={(event) => onMaxPointsChange(Number(event.target.value))}
        />
      </div>
      <button type="button" className="settings-bar__reset" onClick={handleReset}>
        Νέος γύρος
      </button>
    </section>
  );
}
