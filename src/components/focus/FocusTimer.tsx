'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Clock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FocusTimerProps {
  onComplete: () => void;
}

type TimerPreset = {
  label: string;
  minutes: number;
};

const TIMER_PRESETS: TimerPreset[] = [
  { label: '15분', minutes: 15 },
  { label: '25분', minutes: 25 },
  { label: '30분', minutes: 30 },
  { label: '45분', minutes: 45 },
  { label: '60분', minutes: 60 },
];

export function FocusTimer({ onComplete }: FocusTimerProps) {
  const [selectedPreset, setSelectedPreset] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState(selectedPreset * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedPreset * 60);
  };

  const handlePresetChange = (minutes: string) => {
    const newMinutes = parseInt(minutes, 10);
    setSelectedPreset(newMinutes);
    setTimeLeft(newMinutes * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="text-8xl font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <div className="flex items-center gap-2">
          <Select
            value={selectedPreset.toString()}
            onValueChange={handlePresetChange}
            disabled={isRunning}
          >
            <SelectTrigger className="w-[180px] bg-transparent text-white border-white">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="타이머 시간 선택" />
            </SelectTrigger>
            <SelectContent>
              {TIMER_PRESETS.map((preset) => (
                <SelectItem 
                  key={preset.minutes} 
                  value={preset.minutes.toString()}
                >
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={toggleTimer}
          className="border-white text-black hover:bg-black hover:text-white"
        >
          {isRunning ? (
            <><Pause className="mr-2 h-4 w-4" /> 일시정지</>
          ) : (
            <><Play className="mr-2 h-4 w-4" /> 시작</>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={resetTimer}
          className="border-white text-black hover:bg-black hover:text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          리셋
        </Button>
      </div>
    </div>
  );
} 