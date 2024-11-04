import { create } from 'zustand';
import { Goal, Task, TimeFrame, Priority } from '@/types/goals';
import { storage } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';

interface GoalStore {
  goals: Goal[];
  addGoal: (title: string, timeFrame: TimeFrame, priority: Priority) => void;
  addTask: (goalId: string, task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  updateTask: (goalId: string, taskId: string, updates: Partial<Task>) => void;
  deleteGoal: (goalId: string) => void;
  deleteTask: (goalId: string, taskId: string) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: storage.getGoals(),
  
  addGoal: (title, timeFrame, priority) => {
    set((state) => {
      const newGoals = [...state.goals, {
        id: uuidv4(),
        title,
        timeFrame,
        priority,
        tasks: [],
        createdAt: new Date()
      }];
      storage.setGoals(newGoals);
      return { goals: newGoals };
    });
  },

  addTask: (goalId, task) => {
    set((state) => {
      const newGoals = state.goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            tasks: [...goal.tasks, { ...task, id: uuidv4(), createdAt: new Date() }]
          };
        }
        return goal;
      });
      storage.setGoals(newGoals);
      return { goals: newGoals };
    });
  },

  updateGoal: (goalId, updates) => {
    set((state) => {
      const newGoals = state.goals.map((goal) =>
        goal.id === goalId ? { ...goal, ...updates } : goal
      );
      storage.setGoals(newGoals);
      return { goals: newGoals };
    });
  },

  updateTask: (goalId, taskId, updates) => {
    set((state) => {
      const newGoals = state.goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            tasks: goal.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            )
          };
        }
        return goal;
      });
      storage.setGoals(newGoals);
      return { goals: newGoals };
    });
  },

  deleteGoal: (goalId) => {
    set((state) => {
      const newGoals = state.goals.filter((goal) => goal.id !== goalId);
      storage.setGoals(newGoals);
      return { goals: newGoals };
    });
  },

  deleteTask: (goalId, taskId) => {
    set((state) => {
      const newGoals = state.goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            tasks: goal.tasks.filter((task) => task.id !== taskId)
          };
        }
        return goal;
      });
      storage.setGoals(newGoals);
      return { goals: newGoals };
    });
  }
})); 