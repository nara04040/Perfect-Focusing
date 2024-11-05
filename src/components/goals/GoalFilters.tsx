'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Priority } from '@/types/goals';

interface GoalFiltersProps {
  priority: Priority | 'all';
  sortOrder: 'asc' | 'desc';
  onPriorityChange: (value: Priority | 'all') => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

export function GoalFilters({
  priority,
  sortOrder,
  onPriorityChange,
  onSortOrderChange,
}: GoalFiltersProps) {
  return (
    <div className="flex gap-4 mb-4">
      <Select value={priority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="우선순위 필터" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 우선순위</SelectItem>
          <SelectItem value="high">높음</SelectItem>
          <SelectItem value="medium">중간</SelectItem>
          <SelectItem value="low">낮음</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">우선순위 높은 순</SelectItem>
          <SelectItem value="asc">우선순위 낮은 순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 