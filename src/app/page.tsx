import { TodoList } from '@/components/Todo/TodoList';
import { Hero } from '@/components/hero';
import { auth } from '@/server/auth';

export default async function Page() {
  const session = await auth();

  if (!session) return <Hero />;

  return (
    <div className="mx-auto max-w-md">
      <TodoList />
    </div>
  );
}
