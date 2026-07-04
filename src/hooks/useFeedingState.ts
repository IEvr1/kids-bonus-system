import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_FEEDING_STATE,
  FEEDING_STORAGE_KEY,
  type FeedingState,
} from '../types';

function loadFeedingState(): FeedingState {
  try {
    const raw = localStorage.getItem(FEEDING_STORAGE_KEY);
    if (!raw) return DEFAULT_FEEDING_STATE;

    const parsed = JSON.parse(raw) as Partial<FeedingState>;
    const lastFedAt =
      typeof parsed.lastFedAt === 'string' ? parsed.lastFedAt : null;
    const lastMilkMl =
      typeof parsed.lastMilkMl === 'number' && parsed.lastMilkMl > 0
        ? Math.round(parsed.lastMilkMl)
        : null;

    return { lastFedAt, lastMilkMl };
  } catch {
    return DEFAULT_FEEDING_STATE;
  }
}

export function useFeedingState() {
  const [state, setState] = useState<FeedingState>(loadFeedingState);

  useEffect(() => {
    localStorage.setItem(FEEDING_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const recordFeed = useCallback((milkMl: number) => {
    const clampedMl = Math.max(1, Math.min(1000, Math.round(milkMl)));
    setState({
      lastFedAt: new Date().toISOString(),
      lastMilkMl: clampedMl,
    });
  }, []);

  const resetFeeding = useCallback(() => {
    setState({ ...DEFAULT_FEEDING_STATE });
  }, []);

  return {
    lastFedAt: state.lastFedAt,
    lastMilkMl: state.lastMilkMl,
    recordFeed,
    resetFeeding,
  };
}
