import BackgroundDecor from './components/BackgroundDecor';
import ChildCard from './components/ChildCard';
import SettingsBar from './components/SettingsBar';
import { useBonusState } from './hooks/useBonusState';
import { CHILDREN } from './types';

export default function App() {
  const { state, setMaxPoints, addPoint, subtractPoint, resetScores } = useBonusState();

  return (
    <div className="app">
      <BackgroundDecor />

      <main className="app__content">
        <header className="app__header">
          <h1 className="app__title">Σύστημα Ανταμοιβών</h1>
          <p className="app__subtitle">Μαζέψτε πόντους και φτάστε τον στόχο! ⭐</p>
        </header>

        <SettingsBar
          maxPoints={state.maxPoints}
          onMaxPointsChange={setMaxPoints}
          onReset={resetScores}
        />

        <section className="app__cards">
          {CHILDREN.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              points={state.scores[child.id]}
              maxPoints={state.maxPoints}
              onAdd={() => addPoint(child.id)}
              onSubtract={() => subtractPoint(child.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
