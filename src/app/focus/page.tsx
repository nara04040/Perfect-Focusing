'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useGoalStore } from '@/store/goalStore';
import { FocusTimer } from '@/components/focus/FocusTimer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, SkipForward } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Task, Goal, Priority } from '@/types/goals';

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function FocusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const goalId = searchParams.get('goalId');
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const { goals, updateTask, completeGoal } = useGoalStore();

  // 우선순위에 따라 작업 정렬
  const getSortedIncompleteTasks = (tasks: Task[]) => {
    return [...tasks]
      .filter(task => !task.completed)
      .sort((a, b) => {
        const orderA = priorityOrder[a.priority as Priority];
        const orderB = priorityOrder[b.priority as Priority];
        return orderB - orderA; // 높은 우선순위가 먼저 오도록
      });
  };

  useEffect(() => {
    if (!goalId) {
      router.push('/');
      return;
    }

    const goal = goals.find(g => g.id === goalId);
    if (!goal || goal.completed) {
      router.push('/');
      return;
    }

    const incompleteTasks = getSortedIncompleteTasks(goal.tasks);
    if (incompleteTasks.length === 0) {
      completeGoal(goalId);
      router.push('/');
      return;
    }

    setCurrentGoal(goal);
    setCurrentTaskIndex(0); // 정렬된 작업 목록의 첫 번째 작업부터 시작
  }, [goalId, goals, router, completeGoal]);

  const getCurrentTask = (): Task | null => {
    if (!currentGoal) return null;
    const sortedIncompleteTasks = getSortedIncompleteTasks(currentGoal.tasks);
    return sortedIncompleteTasks[currentTaskIndex] || null;
  };

  const handleCompleteTask = () => {
    const currentTask = getCurrentTask();
    if (!currentGoal || !currentTask) return;

    updateTask(currentGoal.id, currentTask.id, { completed: true });
    
    // 다음 미완료 작업이 있는지 확인
    const remainingTasks = getSortedIncompleteTasks(currentGoal.tasks).length - 1;
    
    if (remainingTasks > 0) {
      // 현재 인덱스 유지 (다음 미완료 작업이 자동으로 현재 인덱스 위치에 오게 됨)
      setCurrentTaskIndex(0);
    } else {
      // 모든 작업이 완료되면 목표를 완료 처리하고 메인 페이지로 이동
      completeGoal(currentGoal.id);
      router.push('/');
    }
  };

  const handleSkipTask = () => {
    const incompleteTasks = currentGoal ? getSortedIncompleteTasks(currentGoal.tasks) : [];
    if (currentTaskIndex < incompleteTasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    }
  };

  const currentTask = getCurrentTask();
  if (!currentGoal || !currentTask) return null;

  const incompleteTasks = getSortedIncompleteTasks(currentGoal.tasks);
  const progress = `${currentTaskIndex + 1}/${incompleteTasks.length}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              돌아가기
            </Button>
          </Link>
          <div className="flex gap-2">
            {currentTaskIndex < incompleteTasks.length - 1 && (
              <Button
                variant="ghost"
                className="text-white"
                onClick={handleSkipTask}
              >
                <SkipForward className="mr-2 h-4 w-4" />
                건너뛰기
              </Button>
            )}
            <Button
              variant="ghost"
              className="text-white"
              onClick={handleCompleteTask}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              완료
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-lg text-gray-400">{currentGoal.title}</h2>
            <div className="text-sm text-gray-500 mt-1">
              진행률: {progress}
            </div>
            <h1 className="text-3xl font-bold mt-2">
              {currentTask.title}
              <span className="text-sm text-gray-400 ml-2">
                ({currentTask.priority} 우선순위)
              </span>
            </h1>
          </div>

          <FocusTimer
            onComplete={handleCompleteTask}
          />
        </div>
      </div>
    </main>
  );
} 