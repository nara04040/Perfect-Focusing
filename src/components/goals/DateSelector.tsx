'use client';

import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const isToday = isSameDay(selectedDate, new Date());

  return (
    <div className="flex items-center gap-4 mb-4">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevDay}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex gap-2 items-center">
        <span className="text-lg font-medium">
          {format(selectedDate, 'PPP', { locale: ko })}
        </span>
        {!isToday && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleToday}
          >
            오늘
          </Button>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleNextDay}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
} 