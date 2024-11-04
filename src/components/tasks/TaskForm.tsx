'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGoalStore } from '@/store/goalStore';
import { Priority } from '@/types/goals';

interface TaskFormProps {
  goalId: string;
  onComplete?: () => void;
}

export function TaskForm({ goalId, onComplete }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const addTask = useGoalStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask(goalId, {
      title,
      priority,
      completed: false,
    });

    setTitle('');
    onComplete?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
        required
      />
      <div className="flex gap-2">
        <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
          <SelectTrigger>
            <SelectValue placeholder="우선순위" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" size="sm">추가</Button>
      </div>
    </form>
  );
} 