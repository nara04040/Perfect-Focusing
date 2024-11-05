import { GoalForm } from '@/components/goals/GoalForm';
import { DailyGoals } from '@/components/goals/DailyGoals';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">오늘의 목표</h1>
        <Link href="/goals">
          <Button variant="outline">모든 목표 보기</Button>
        </Link>
      </div>
      <GoalForm defaultTimeFrame="daily" />
      <DailyGoals />
    </main>
  );
}
