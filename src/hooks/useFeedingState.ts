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

    return { lastFedAt };
  } catch {
    return DEFAULT_FEEDING_STATE;
  }
}

export function useFeedingState() {
  const [state, setState] = useState<FeedingState>(loadFeedingState);

  useEffect(() => {
    localStorage.setItem(FEEDING_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const recordFeed = useCallback(() => {
    setState({ lastFedAt: new Date().toISOString() });
  }, []);

  return {
    lastFedAt: state.lastFedAt,
    recordFeed,
  };
}
