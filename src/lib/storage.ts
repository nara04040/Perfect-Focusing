import { Goal, Task } from '@/types/goals';

const GOALS_KEY = 'perfect-focusing-goals';

export const storage = {
  getGoals: (): Goal[] => {
    if (typeof window === 'undefined') return [];
    const goals = localStorage.getItem(GOALS_KEY);
    return goals ? JSON.parse(goals) : [];
  },

  setGoals: (goals: Goal[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  },
}; 