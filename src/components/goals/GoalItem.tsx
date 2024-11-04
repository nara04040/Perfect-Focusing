'use client';

import { useState } from 'react';
import { Goal } from '@/types/goals';
import { Button } from '@/components/ui/button';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskItem } from '@/components/tasks/TaskItem';
import { useGoalStore } from '@/store/goalStore';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface GoalItemProps {
  goal: Goal;
}

export function GoalItem({ goal }: GoalItemProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const handleDeleteGoal = () => {
    if (confirm('정말로 이 목표를 삭제하시겠습니까?')) {
      deleteGoal(goal.id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>{goal.title}</CardTitle>
          <CardDescription>
            {goal.timeFrame} • {goal.priority} 우선순위
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleDeleteGoal}>
          삭제
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {goal.tasks.map((task) => (
          <TaskItem key={task.id} goalId={goal.id} task={task} />
        ))}
        
        {isAddingTask ? (
          <TaskForm 
            goalId={goal.id} 
            onComplete={() => setIsAddingTask(false)} 
          />
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAddingTask(true)}
          >
            할 일 추가
          </Button>
        )}
      </CardContent>
    </Card>
  );
} 