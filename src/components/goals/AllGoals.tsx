'use client';

import { useState } from 'react';
import { useGoalStore } from '@/store/goalStore';
import { GoalItem } from './GoalItem';
import { TimeFrame, Priority, Goal } from '@/types/goals';
import { useMemo } from 'react';
import { GoalFilters } from './GoalFilters';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

export function AllGoals() {
  const goals = useGoalStore((state) => state.goals);
  const [priority, setPriority] = useState<Priority | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const goalsByTimeFrame = useMemo(() => {
    const filterAndSortGoals = (goals: Goal[]) => {
      let filtered = goals;
      
      // 우선순위 필터링
      if (priority !== 'all') {
        filtered = filtered.filter(goal => goal.priority === priority);
      }

      // 우선순위 정렬
      return filtered.sort((a, b) => {
        const orderA = priorityOrder[a.priority];
        const orderB = priorityOrder[b.priority];
        return sortOrder === 'desc' ? orderB - orderA : orderA - orderB;
      });
    };

    return {
      daily: filterAndSortGoals(goals.filter(goal => goal.timeFrame === 'daily')),
      weekly: filterAndSortGoals(goals.filter(goal => goal.timeFrame === 'weekly')),
      monthly: filterAndSortGoals(goals.filter(goal => goal.timeFrame === 'monthly'))
    };
  }, [goals, priority, sortOrder]);

  return (
    <div className="space-y-4 mt-4">
      <GoalFilters
        priority={priority}
        sortOrder={sortOrder}
        onPriorityChange={setPriority}
        onSortOrderChange={setSortOrder}
      />
      
      <Tabs defaultValue="daily" className="mt-6">
        <TabsList>
          <TabsTrigger value="daily">일간 목표</TabsTrigger>
          <TabsTrigger value="weekly">주간 목표</TabsTrigger>
          <TabsTrigger value="monthly">월간 목표</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4 mt-4">
          {goalsByTimeFrame.daily.length > 0 ? (
            goalsByTimeFrame.daily.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              목표가 없습니다.
            </div>
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4 mt-4">
          {goalsByTimeFrame.weekly.length > 0 ? (
            goalsByTimeFrame.weekly.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              목표가 없습니다.
            </div>
          )}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4 mt-4">
          {goalsByTimeFrame.monthly.length > 0 ? (
            goalsByTimeFrame.monthly.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              목표가 없습니다.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 