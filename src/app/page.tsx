import { GoalForm } from '@/components/goals/GoalForm';
import { DailyGoals } from '@/components/goals/DailyGoals';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function Home() {
  const today = new Date();
  const formattedDate = format(today, 'PPP', { locale: ko });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">오늘의 목표</h1>
          <Link href="/goals">
            <Button variant="outline">모든 목표 보기</Button>
          </Link>
        </div>
        <p className="text-gray-500">{formattedDate}</p>
      </div>
      <GoalForm defaultTimeFrame="daily" />
      <DailyGoals />
    </main>
  );
}
