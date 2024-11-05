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
import { TimeFrame, Priority, Goal } from '@/types/goals';

interface GoalEditFormProps {
  goal: Goal;
  onCancel: () => void;
}

export function GoalEditForm({ goal, onCancel }: GoalEditFormProps) {
  const [title, setTitle] = useState(goal.title);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(goal.timeFrame);
  const [priority, setPriority] = useState<Priority>(goal.priority);
  const updateGoal = useGoalStore((state) => state.updateGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    updateGoal(goal.id, {
      title,
      timeFrame,
      priority,
    });
    onCancel();
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
      <div className="flex gap-2">
        <Button type="submit">수정 완료</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  );
} 