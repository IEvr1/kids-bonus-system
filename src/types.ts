export type ChildId = 'konstantina' | 'chrysilia' | 'alexandros';

export interface BonusState {
  maxPoints: number;
  scores: Record<ChildId, number>;
}

export interface ChildConfig {
  id: ChildId;
  name: string;
  animal: string;
  themeColor: string;
  themeColorLight: string;
  themeColorDark: string;
}

export const STORAGE_KEY = 'kids-bonus-v1';

export const DEFAULT_STATE: BonusState = {
  maxPoints: 10,
  scores: {
    konstantina: 0,
    chrysilia: 0,
    alexandros: 0,
  },
};

export const CHILDREN: ChildConfig[] = [
  {
    id: 'konstantina',
    name: 'Κωνσταντίνα',
    animal: '🌈',
    themeColor: '#f472b6',
    themeColorLight: '#fce7f3',
    themeColorDark: '#db2777',
  },
  {
    id: 'chrysilia',
    name: 'Χρυσήλια',
    animal: '🐱',
    themeColor: '#fb923c',
    themeColorLight: '#ffedd5',
    themeColorDark: '#ea580c',
  },
  {
    id: 'alexandros',
    name: 'Αλέξανδρος',
    animal: '🦁',
    themeColor: '#60a5fa',
    themeColorLight: '#dbeafe',
    themeColorDark: '#2563eb',
  },
];

export const ALL_CHILD_IDS: ChildId[] = CHILDREN.map((child) => child.id);

export const FEEDING_INTERVAL_MS = 3 * 60 * 60 * 1000;

export const FEEDING_STORAGE_KEY = 'kids-feeding-v1';

export interface FeedingState {
  lastFedAt: string | null;
}

export const DEFAULT_FEEDING_STATE: FeedingState = {
  lastFedAt: null,
};
