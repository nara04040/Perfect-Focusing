'use client';

import { Button } from "@/components/ui/button";
import { 
  format, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  subWeeks,
} from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekSelectorProps {
  selectedDate: Date;
  selectedDay: Date | null;
  onDateChange: (date: Date) => void;
  onDaySelect: (date: Date | null) => void;
}

export function WeekSelector({ 
  selectedDate, 
  selectedDay,
  onDateChange, 
  onDaySelect 
}: WeekSelectorProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const handlePrevWeek = () => {
    onDateChange(subWeeks(selectedDate, 1));
    onDaySelect(null); // 주간 이동 시 날짜 선택 초기화
  };

  const handleNextWeek = () => {
    onDateChange(addWeeks(selectedDate, 1));
    onDaySelect(null); // 주간 이동 시 날짜 선택 초기화
  };

  const handleDayClick = (date: Date) => {
    // 이미 선택된 날짜를 다시 클릭하면 선택 해제
    if (selectedDay && isSameDay(date, selectedDay)) {
      onDaySelect(null);
    } else {
      onDaySelect(date);
    }
  };

  const isToday = (date: Date) => isSameDay(date, new Date());

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevWeek}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium">
          {format(weekStart, 'yyyy년 MM월 d일', { locale: ko })} - {format(weekEnd, 'MM월 d일', { locale: ko })}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextWeek}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {daysInWeek.map((day) => (
          <Button
            key={day.toISOString()}
            variant={selectedDay && isSameDay(day, selectedDay) ? "default" : "outline"}
            className={`h-12 ${isToday(day) ? 'border-blue-500' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs">{format(day, 'E', { locale: ko })}</span>
              <span className="text-sm">{format(day, 'd')}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
} 