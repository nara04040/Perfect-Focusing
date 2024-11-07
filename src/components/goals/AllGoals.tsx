'use client';

import { useState, useEffect, useMemo } from 'react';
import { useGoalStore } from '@/store/goalStore';
import { GoalItem } from './GoalItem';
import { TimeFrame, Priority, Goal } from '@/types/goals';
import { GoalFilters } from './GoalFilters';
import { DateSelector } from './DateSelector';
import { GoalForm } from './GoalForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { WeekSelector } from './WeekSelector';
import { startOfWeek, endOfWeek, isWithinInterval, isSameDay, isSameMonth, endOfMonth } from 'date-fns';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MonthSelector } from './MonthSelector';

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

export function AllGoals() {
  const [mounted, setMounted] = useState(false);
  const goals = useGoalStore((state) => state.goals);
  const [priority, setPriority] = useState<Priority | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date());
  const [selectedWeekDay, setSelectedWeekDay] = useState<Date | null>(null);
  const [showWeeklyGoalForm, setShowWeeklyGoalForm] = useState(false);
  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date());
  const [selectedMonthDay, setSelectedMonthDay] = useState<Date | null>(null);
  const [showMonthlyGoalForm, setShowMonthlyGoalForm] = useState(false);

  const goalsByTimeFrame = useMemo(() => {
    const filterAndSortGoals = (goals: Goal[]) => {
      let filtered = goals;
      
      if (priority !== 'all') {
        filtered = filtered.filter(goal => goal.priority === priority);
      }

      return filtered.sort((a, b) => {
        const orderA = priorityOrder[a.priority];
        const orderB = priorityOrder[b.priority];
        return sortOrder === 'desc' ? orderB - orderA : orderA - orderB;
      });
    };

    const weekStart = startOfWeek(selectedWeekDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(selectedWeekDate, { weekStartsOn: 1 });

    return {
      daily: filterAndSortGoals(goals.filter(goal => {
        if (goal.timeFrame !== 'daily') return false;
        return isSameDay(new Date(goal.createdAt), selectedDate);
      })),
      weekly: filterAndSortGoals(goals.filter(goal => {
        if (goal.timeFrame !== 'daily') return false;
        const goalDate = new Date(goal.createdAt);
        if (selectedWeekDay) {
          return isSameDay(goalDate, selectedWeekDay);
        }
        return isWithinInterval(goalDate, { start: weekStart, end: weekEnd });
      })),
      monthly: filterAndSortGoals(goals.filter(goal => {
        if (goal.timeFrame !== 'daily') return false;
        const goalDate = new Date(goal.createdAt);
        if (selectedMonthDay) {
          return isSameDay(goalDate, selectedMonthDay);
        }
        return isSameMonth(goalDate, selectedMonthDate);
      }))
    };
  }, [goals, priority, sortOrder, selectedDate, selectedWeekDate, selectedWeekDay, selectedMonthDate, selectedMonthDay]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleWeekDaySelect = (date: Date | null) => {
    setSelectedWeekDay(date);
  };

  const WeeklyEmptyGoalsMessage = () => {
    const isPast = selectedWeekDay ? 
      selectedWeekDay < new Date(new Date().setHours(0, 0, 0, 0)) :
      endOfWeek(selectedWeekDate, { weekStartsOn: 1 }) < new Date();

    if (isPast) {
      return (
        <div className="text-center py-8 text-gray-500">
          {selectedWeekDay ? "해당 날짜에 설정된 목표가 없습니다." : "이 주에 설정된 목표가 없습니다."}
        </div>
      );
    }

    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-gray-500">
          {selectedWeekDay ? "해당 날짜에 설정된 목표가 없습니다." : "이 주에 설정된 목표가 없습니다."}
        </p>
        <Button
          variant="outline"
          onClick={() => setShowWeeklyGoalForm(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {selectedWeekDay ? "이 날의 목표 추가하기" : "이 주의 목표 추가하기"}
        </Button>
      </div>
    );
  };

  const MonthlyEmptyGoalsMessage = () => {
    const isPast = selectedMonthDay ? 
      selectedMonthDay < new Date(new Date().setHours(0, 0, 0, 0)) :
      endOfMonth(selectedMonthDate) < new Date();

    if (isPast) {
      return (
        <div className="text-center py-8 text-gray-500">
          {selectedMonthDay ? "해당 날짜에 설정된 목표가 없습니다." : "이 달에 설정된 목표가 없습니다."}
        </div>
      );
    }

    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-gray-500">
          {selectedMonthDay ? "해당 날짜에 설정된 목표가 없습니다." : "이 달에 설정된 목표가 없습니다."}
        </p>
        <Button
          variant="outline"
          onClick={() => setShowMonthlyGoalForm(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {selectedMonthDay ? "이 날의 목표 추가하기" : "이 달의 목표 추가하기"}
        </Button>
      </div>
    );
  };

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
          <DateSelector 
            selectedDate={selectedDate}
            onDateChange={(date) => {
              setSelectedDate(date);
              setShowGoalForm(false);
            }}
          />
          {showGoalForm ? (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">
                {isSameDay(selectedDate, new Date()) 
                  ? "오늘의 새로운 목표 추가"
                  : "새로운 목표 추가"}
              </h3>
              <GoalForm 
                defaultTimeFrame="daily"
                selectedDate={selectedDate}
                onComplete={() => setShowGoalForm(false)}
              />
            </div>
          ) : goalsByTimeFrame.daily.length > 0 ? (
            goalsByTimeFrame.daily.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              해당 날짜에 설정된 목표가 습니다.
            </div>
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4 mt-4">
          <WeekSelector 
            selectedDate={selectedWeekDate}
            selectedDay={selectedWeekDay}
            onDateChange={setSelectedWeekDate}
            onDaySelect={handleWeekDaySelect}
          />
          {showWeeklyGoalForm ? (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {selectedWeekDay 
                    ? format(selectedWeekDay, 'PPP', { locale: ko }) + "의 새로운 목표"
                    : `${format(startOfWeek(selectedWeekDate, { weekStartsOn: 1 }), 'yyyy년 MM��� d일')} - 
                       ${format(endOfWeek(selectedWeekDate, { weekStartsOn: 1 }), 'MM월 d일')}의 새로운 목표`}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWeeklyGoalForm(false)}
                >
                  취소
                </Button>
              </div>
              <GoalForm 
                defaultTimeFrame="daily"
                selectedDate={selectedWeekDay || selectedWeekDate}
                onComplete={() => setShowWeeklyGoalForm(false)}
              />
            </div>
          ) : goalsByTimeFrame.weekly.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {selectedWeekDay ? (
                    format(selectedWeekDay, 'PPP', { locale: ko })
                  ) : (
                    `${format(startOfWeek(selectedWeekDate, { weekStartsOn: 1 }), 'yyyy년 MM월 d일')} - 
                     ${format(endOfWeek(selectedWeekDate, { weekStartsOn: 1 }), 'MM월 d일')} 의 목표`
                  )}
                </h3>
                {selectedWeekDay && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWeekDaySelect(null)}
                  >
                    주간 전체 보기
                  </Button>
                )}
              </div>
              {goalsByTimeFrame.weekly.map((goal) => (
                <GoalItem key={goal.id} goal={goal} />
              ))}
            </div>
          ) : (
            <WeeklyEmptyGoalsMessage />
          )}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4 mt-4">
          <MonthSelector 
            selectedDate={selectedMonthDate}
            onDateChange={setSelectedMonthDate}
            goals={goals}
            onDaySelect={setSelectedMonthDay}
          />
          {showMonthlyGoalForm ? (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {selectedMonthDay 
                    ? format(selectedMonthDay, 'PPP', { locale: ko }) + "의 새로운 목표"
                    : format(selectedMonthDate, 'yyyy년 MM월', { locale: ko }) + "의 새로운 목표"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMonthlyGoalForm(false)}
                >
                  취소
                </Button>
              </div>
              <GoalForm 
                defaultTimeFrame="daily"
                selectedDate={selectedMonthDay || selectedMonthDate}
                onComplete={() => setShowMonthlyGoalForm(false)}
              />
            </div>
          ) : goalsByTimeFrame.monthly.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {selectedMonthDay ? (
                    format(selectedMonthDay, 'PPP', { locale: ko })
                  ) : (
                    format(selectedMonthDate, 'yyyy년 MM월', { locale: ko }) + "의 목표"
                  )}
                </h3>
                {selectedMonthDay && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMonthDay(null)}
                  >
                    월간 전체 보기
                  </Button>
                )}
              </div>
              {goalsByTimeFrame.monthly.map((goal) => (
                <GoalItem key={goal.id} goal={goal} />
              ))}
            </div>
          ) : (
            <MonthlyEmptyGoalsMessage />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 