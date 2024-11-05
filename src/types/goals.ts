export type TimeFrame = 'daily' | 'weekly' | 'monthly';
export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  timeFrame: TimeFrame;
  priority: Priority;
  tasks: Task[];
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
} 