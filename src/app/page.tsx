import { auth } from '@/server/auth';
import { Hero } from './components/Hero';
import { TodoList } from './components/Todo/TodoList';

export default async function Page() {
  const session = await auth();

  if (!session) return <Hero />;

  return (
    <div className="mx-auto max-w-md">
      <TodoList />
    </div>
  );
}
