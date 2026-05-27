import { useCallback, useEffect, useState } from 'react';
import {
  ALL_CHILD_IDS,
  DEFAULT_STATE,
  STORAGE_KEY,
  type BonusState,
  type ChildId,
} from '../types';

function loadState(): BonusState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;

    const parsed = JSON.parse(raw) as Partial<BonusState>;
    const maxPoints =
      typeof parsed.maxPoints === 'number' && parsed.maxPoints >= 1
        ? Math.min(parsed.maxPoints, 100)
        : DEFAULT_STATE.maxPoints;

    const scores = { ...DEFAULT_STATE.scores };
    for (const id of ALL_CHILD_IDS) {
      const value = parsed.scores?.[id];
      scores[id] = typeof value === 'number' && value >= 0 ? value : 0;
    }

    return { maxPoints, scores };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useBonusState() {
  const [state, setState] = useState<BonusState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setMaxPoints = useCallback((maxPoints: number) => {
    const clamped = Math.max(1, Math.min(100, maxPoints));
    setState((prev) => ({ ...prev, maxPoints: clamped }));
  }, []);

  const addPoint = useCallback((childId: ChildId) => {
    setState((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [childId]: prev.scores[childId] + 1,
      },
    }));
  }, []);

  const subtractPoint = useCallback((childId: ChildId) => {
    setState((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [childId]: Math.max(0, prev.scores[childId] - 1),
      },
    }));
  }, []);

  const resetScores = useCallback(() => {
    setState((prev) => ({
      ...prev,
      scores: { ...DEFAULT_STATE.scores },
    }));
  }, []);

  return {
    state,
    setMaxPoints,
    addPoint,
    subtractPoint,
    resetScores,
  };
}
