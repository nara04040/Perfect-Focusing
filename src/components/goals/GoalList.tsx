'use client';

import { useGoalStore } from '@/store/goalStore';
import { Goal } from '@/types/goals';
import { GoalItem } from '@/components/goals/GoalItem';

export function GoalList() {
  const goals = useGoalStore((state) => state.goals);

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
} 