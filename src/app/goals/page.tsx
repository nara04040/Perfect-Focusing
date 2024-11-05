import { GoalForm } from '@/components/goals/GoalForm';
import { AllGoals } from '@/components/goals/AllGoals';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GoalsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">모든 목표</h1>
        <Link href="/">
          <Button variant="outline">오늘의 목표로 돌아가기</Button>
        </Link>
      </div>
      <GoalForm />
      <AllGoals />
    </main>
  );
} 