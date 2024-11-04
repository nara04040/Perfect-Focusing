import { GoalForm } from '@/components/goals/GoalForm';
import { GoalList } from '@/components/goals/GoalList';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Perfect Focusing</h1>
      <GoalForm />
      <GoalList />
    </main>
  );
}
