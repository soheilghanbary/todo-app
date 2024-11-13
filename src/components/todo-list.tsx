'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useClearTodos,
  useCompleteTodo,
  useDeleteTodo,
  useTodos,
} from '@/hooks/use-todo';
import { cn, fromNow } from '@/lib/utils';
import type { Task } from '@prisma/client';
import { FilterIcon, Trash2Icon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import toast from 'react-hot-toast';
import { LoadingIcon } from './common/icons';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const CompleteTodo = ({ id = '', completed = false }) => {
  const { mutateAsync, isPending } = useCompleteTodo();

  const handleComplete = () => {
    mutateAsync(
      { id, completed: !completed },
      {
        onSettled: () => {
          toast.success('Todo completed successfully');
        },
      },
    );
  };

  return (
    <Checkbox id={id} checked={completed} onCheckedChange={handleComplete} />
  );
};

const DeleteTodo = ({ id = '' }) => {
  const { mutateAsync, isPending } = useDeleteTodo();

  const handleDelete = async () => {
    await mutateAsync(id, {
      onSettled: () => {
        toast.success('Todo deleted successfully');
      },
    });
  };

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      onClick={handleDelete}
      disabled={isPending}
      className="size-8 text-destructive hover:text-destructive"
    >
      {isPending ? (
        <LoadingIcon className="fill-destructive" />
      ) : (
        <Trash2Icon />
      )}
    </Button>
  );
};

const TodoItem = (task: Task) => (
  <div className="rounded-md border bg-card p-2 shadow-sm">
    <div className="flex flex-col gap-2">
      <label
        htmlFor={task.id}
        className={cn('flex w-fit cursor-pointer items-center gap-2 text-sm', {
          'text-muted-foreground line-through': task.completed,
        })}
      >
        <CompleteTodo id={task.id} completed={task.completed} />{' '}
        <p>{task.title}</p>
      </label>
      <Separator className="bg-border/40" />
      <div className="flex items-center justify-between gap-2">
        <p className="flex-1 text-muted-foreground text-xs">
          {fromNow(task.createdAt)}
        </p>
        <DeleteTodo id={task.id} />
      </div>
    </div>
  </div>
);

const FilterTodo = () => {
  const [filter, setFilter] = useQueryState('filter');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'flat'} size={'sm'}>
          <FilterIcon />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setFilter(null)}>All</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setFilter('completed')}>
          Completed
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setFilter('not')}>
          not completed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function ClearTodos() {
  const { isPending, mutateAsync } = useClearTodos();

  const handleClick = () => {
    mutateAsync(undefined, {
      onSuccess: () => {
        toast.success('Cleared all tasks');
      },
    });
  };

  return (
    <button
      type="button"
      className="text-[10px] text-muted-foreground"
      disabled={isPending}
      onClick={handleClick}
    >
      Clear
    </button>
  );
}

export function TodoList() {
  const [filter, setFilter] = useQueryState('filter');
  const { data: todos, isPending } = useTodos(filter);

  if (isPending)
    return <LoadingIcon className="mx-auto my-8 size-5 fill-primary" />;

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <FilterTodo />
        <ClearTodos />
        <h2 className="flex-1 text-right font-medium text-sm">
          {todos?.length} Tasks
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {!todos?.length ? (
          <p className="my-4 text-center text-foreground/80 text-sm">
            Empty Tasks 🫡
          </p>
        ) : (
          todos?.map((t) => <TodoItem key={t.id} {...t} />)
        )}
      </div>
    </>
  );
}
