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
import { TimeFrame, Priority } from '@/types/goals';

interface GoalStoreState {
  addGoal: (title: string, timeFrame: TimeFrame, priority: Priority) => void;
}

export function GoalForm() {
  const [title, setTitle] = useState('');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const [priority, setPriority] = useState<Priority>('medium');
  const addGoal = useGoalStore((state: GoalStoreState) => state.addGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addGoal(title, timeFrame, priority);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="목표를 입력하세요"
        required
      />
      <Select value={timeFrame} onValueChange={(value: TimeFrame) => setTimeFrame(value)}>
        <SelectTrigger>
          <SelectValue placeholder="기간 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>
      <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
        <SelectTrigger>
          <SelectValue placeholder="우선순위 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">목표 추가</Button>
    </form>
  );
} 