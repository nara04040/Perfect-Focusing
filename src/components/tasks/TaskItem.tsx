'use client';

import { Task } from '@/types/goals';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useGoalStore } from '@/store/goalStore';

interface TaskItemProps {
  goalId: string;
  task: Task;
}

export function TaskItem({ goalId, task }: TaskItemProps) {
  const { updateTask, deleteTask } = useGoalStore();

  const handleComplete = () => {
    updateTask(goalId, task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    deleteTask(goalId, task.id);
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded-lg">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleComplete}
        />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
        <span className="text-sm text-gray-500">({task.priority})</span>
      </div>
      <Button variant="ghost" size="sm" onClick={handleDelete}>
        삭제
      </Button>
    </div>
  );
} 