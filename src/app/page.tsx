import { AddTodo } from '@/components/add-todo';
import { Hero } from '@/components/hero';
import { TodoList } from '@/components/todo-list';
import { auth } from '@/server/auth';

export default async function Page() {
  const session = await auth();

  if (!session) return <Hero />;

  return (
    <div className="mx-auto max-w-md">
      <div className="grid gap-4">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}
