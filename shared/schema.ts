import { z } from "zod";

export const dhikrSchema = z.object({
  id: z.string(),
  name: z.string(),
  arabic: z.string(),
  translation: z.string(),
  meaning: z.string(),
  count: z.number().min(0).default(0),
  targetCount: z.number().min(1).default(33),
});

export const counterDataSchema = z.object({
  counters: z.record(dhikrSchema),
  currentDhikr: z.string(),
  todayTotal: z.number().min(0).default(0),
  streakDays: z.number().min(0).default(0),
  weekTotal: z.number().min(0).default(0),
  allTimeTotal: z.number().min(0).default(0),
  lastUsedDate: z.string().optional(),
});

export type Dhikr = z.infer<typeof dhikrSchema>;
export type CounterData = z.infer<typeof counterDataSchema>;

export const defaultDhikrs: Record<string, Dhikr> = {
  subhanallah: {
    id: 'subhanallah',
    name: 'Subhan Allah',
    arabic: 'سُبْحَانَ اللهِ',
    translation: 'Subhan Allah',
    meaning: 'Glory be to Allah',
    count: 0,
    targetCount: 33,
  },
  alhamdulillah: {
    id: 'alhamdulillah',
    name: 'Alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    translation: 'Alhamdulillah',
    meaning: 'All praise is due to Allah',
    count: 0,
    targetCount: 33,
  },
  allahuakbar: {
    id: 'allahuakbar',
    name: 'Allahu Akbar',
    arabic: 'اللهُ أَكْبَر',
    translation: 'Allahu Akbar',
    meaning: 'Allah is the Greatest',
    count: 0,
    targetCount: 34,
  },
  lailla: {
    id: 'lailla',
    name: 'La illa illa Allah',
    arabic: 'لَا إِلٰهَ إِلَّا الله',
    translation: 'La illa illa Allah',
    meaning: 'There is no god but Allah',
    count: 0,
    targetCount: 100,
  },
};
