'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface FocusTimerProps {
  onComplete: () => void;
}

export function FocusTimer({ onComplete }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);

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
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-8">
      <div className="text-8xl font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={toggleTimer}
          className="border-white hover:bg-black text-black hover:text-white"
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
          className="hover:text-white hover:bg-black border-white bg-white text-black"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          리셋
        </Button>
      </div>
    </div>
  );
} 