'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  format, 
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek
} from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Goal } from "@/types/goals";

interface MonthSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  goals: Goal[];
  onDaySelect: (date: Date) => void;
}

export function MonthSelector({ 
  selectedDate, 
  onDateChange,
  goals,
  onDaySelect
}: MonthSelectorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  allDays.forEach((day) => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const handlePrevMonth = () => {
    onDateChange(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(selectedDate, 1));
  };

  const getGoalsForDay = (date: Date) => {
    return goals.filter(goal => isSameDay(new Date(goal.createdAt), date));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium">
          {format(selectedDate, 'yyyy년 MM월', { locale: ko })}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
          <div key={day} className="py-1 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1 p-1">
            {week.map((day) => {
              const dayGoals = getGoalsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, selectedDate);

              return (
                <div key={day.toISOString()}>
                  <Button
                    variant="outline"
                    className={`w-11/12 h-16 p-16 relative ${
                      !isCurrentMonth ? 'text-gray-400' : 'border-gray-400'
                    } ${isToday ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => onDaySelect(day)}
                  >
                    <div className="absolute top-1 left-1">
                      {format(day, 'd')}
                    </div>
                    {dayGoals.length > 0 && (
                      <div className="absolute top-6 left-1">
                        <div className="flex items-center gap-0.5">
                          {dayGoals.slice(0, 3).map((goal) => (
                            <div
                              key={goal.id}
                              className={`w-2 h-2 rounded-full ${
                                goal.completed ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                            />
                          ))}
                          {dayGoals.length > 3 && (
                            <div className="text-xs">+{dayGoals.length - 3}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Button>
                  {dayGoals.length > 0 && (
                    <div className="hidden group-hover:block absolute z-10 bg-white p-2 rounded shadow-lg">
                      {dayGoals.map((goal) => (
                        <div key={goal.id} className="text-sm">
                          • {goal.title}
                          {goal.completed && " ✓"}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
} 