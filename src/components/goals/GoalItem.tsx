'use client';

import { useState } from 'react';
import { Goal } from '@/types/goals';
import { Button } from '@/components/ui/button';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskItem } from '@/components/tasks/TaskItem';
import { useGoalStore } from '@/store/goalStore';
import { GoalEditForm } from './GoalEditForm';
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle2, CircleDashed } from "lucide-react";

interface GoalItemProps {
  goal: Goal;
}

export function GoalItem({ goal }: GoalItemProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteGoal, completeGoal, uncompleteGoal } = useGoalStore();

  const handleDeleteGoal = () => {
    if (confirm('정말로 이 목표를 삭제하시겠습니까?')) {
      deleteGoal(goal.id);
    }
  };

  const handleToggleComplete = () => {
    if (goal.completed) {
      uncompleteGoal(goal.id);
    } else {
      completeGoal(goal.id);
    }
  };

  if (isEditing) {
    return (
      <Card>
        <CardContent className="pt-6">
          <GoalEditForm 
            goal={goal} 
            onCancel={() => setIsEditing(false)} 
          />
        </CardContent>
      </Card>
    );
  }

  const completedTasks = goal.tasks.filter(task => task.completed).length;
  const totalTasks = goal.tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <Card className={goal.completed ? 'bg-gray-50' : ''}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={goal.completed ? 'text-green-600' : 'text-gray-400'}
            onClick={handleToggleComplete}
          >
            {goal.completed ? <CheckCircle2 className="h-5 w-5" /> : <CircleDashed className="h-5 w-5" />}
          </Button>
          <div>
            <CardTitle className={goal.completed ? 'line-through text-gray-500' : ''}>
              {goal.title}
            </CardTitle>
            <CardDescription>
              {goal.timeFrame} • {goal.priority} 우선순위
              {goal.completedAt && (
                <span className="ml-2 text-green-600">
                  • {format(new Date(goal.completedAt), 'yyyy-MM-dd HH:mm')}에 완료
                </span>
              )}
            </CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              수정
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleToggleComplete}>
              {goal.completed ? '완료 취소' : '완료하기'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteGoal} className="text-red-600">
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        {goal.tasks.map((task) => (
          <TaskItem key={task.id} goalId={goal.id} task={task} />
        ))}
        
        {!goal.completed && (isAddingTask ? (
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
        ))}
      </CardContent>
      {totalTasks > 0 && (
        <CardFooter>
          <div className="w-full">
            <div className="text-sm text-gray-600 mb-2">
              진행률: {Math.round(progress)}% ({completedTasks}/{totalTasks})
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
} 