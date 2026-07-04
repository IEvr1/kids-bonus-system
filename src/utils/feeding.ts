import { FEEDING_INTERVAL_MS } from '../types';

export function getNextFeedingAt(lastFedAt: string | null): Date | null {
  if (!lastFedAt) return null;
  return new Date(new Date(lastFedAt).getTime() + FEEDING_INTERVAL_MS);
}

export function isFeedingOverdue(lastFedAt: string | null, now = Date.now()): boolean {
  const nextFeeding = getNextFeedingAt(lastFedAt);
  if (!nextFeeding) return false;
  return now >= nextFeeding.getTime();
}

export function formatFeedingDateTime(date: Date): string {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (isToday) {
    return date.toLocaleTimeString('el-GR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleString('el-GR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
