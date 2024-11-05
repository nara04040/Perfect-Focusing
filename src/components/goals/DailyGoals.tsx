'use client';

import { useState } from 'react';
import { useGoalStore } from '@/store/goalStore';
import { GoalItem } from './GoalItem';
import { isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { Priority } from '@/types/goals';
import { GoalFilters } from './GoalFilters';

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

export function DailyGoals() {
  const goals = useGoalStore((state) => state.goals);
  const [priority, setPriority] = useState<Priority | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const dailyGoals = useMemo(() => {
    let filtered = goals.filter(goal => {
      if (goal.timeFrame !== 'daily') return false;
      const goalDate = new Date(goal.createdAt);
      const today = new Date();
      return isSameDay(goalDate, today);
    });

    if (priority !== 'all') {
      filtered = filtered.filter(goal => goal.priority === priority);
    }

    return filtered.sort((a, b) => {
      const orderA = priorityOrder[a.priority];
      const orderB = priorityOrder[b.priority];
      return sortOrder === 'desc' ? orderB - orderA : orderA - orderB;
    });
  }, [goals, priority, sortOrder]);

  return (
    <div className="space-y-4 mt-4">
      <GoalFilters
        priority={priority}
        sortOrder={sortOrder}
        onPriorityChange={setPriority}
        onSortOrderChange={setSortOrder}
      />

      {dailyGoals.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          오늘 설정된 목표가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {dailyGoals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
} 