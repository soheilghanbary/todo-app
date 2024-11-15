'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  useClearTodos,
  useCompleteTodo,
  useDeleteTodo,
  useTodos,
} from '@/hooks/use-todos';
import { cn, fromNow } from '@/lib/utils';
import NumberFlow from '@number-flow/react';
import type { Task } from '@prisma/client';
import { FilterIcon, Trash2Icon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { type MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingIcon } from './common/icons';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type CompleteTodoProps = {
  id: string;
  completed: boolean;
};

const CompleteTodo = ({ id, completed }: CompleteTodoProps) => {
  const { mutateAsync, isPending } = useCompleteTodo();
  const handleComplete = async () =>
    await mutateAsync({ id, completed: !completed });

  return (
    <Checkbox id={id} checked={completed} onCheckedChange={handleComplete} />
  );
};

const DeleteTodo = ({ id = '' }) => {
  const { mutateAsync, isPending } = useDeleteTodo();
  const handleDelete = async () => await mutateAsync(id);

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
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useQueryState('filter');

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === 'all') {
      setFilter(null);
    } else {
      setFilter(e.currentTarget.name);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'flat'} size={'sm'}>
          <FilterIcon />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-2">
        <div className="flex flex-col gap-2">
          <Button
            name="all"
            size={'sm'}
            variant={'flat'}
            onClick={handleFilter}
          >
            All
          </Button>
          <Button
            size={'sm'}
            name="completed"
            variant={'flat'}
            onClick={handleFilter}
          >
            Completed
          </Button>
          <Button
            name="not"
            size={'sm'}
            variant={'flat'}
            onClick={handleFilter}
          >
            Un Completed
          </Button>
        </div>
      </PopoverContent>
    </Popover>
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
      Clear Tasks
    </button>
  );
}

export function TodoList() {
  const [filter, _] = useQueryState('filter');
  const { data: todos, isPending } = useTodos();

  if (isPending)
    return <LoadingIcon className="mx-auto my-8 size-5 fill-primary" />;

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'not') return !todo.completed;
    return true; // 'all' or undefined returns all todos
  });

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <FilterTodo />
        <ClearTodos />
        <h2 className="text-right font-medium text-sm">
          <NumberFlow
            aria-hidden
            willChange
            format={{ useGrouping: false }}
            value={Number(filteredTodos?.length)}
          />{' '}
          Tasks
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {!filteredTodos?.length ? (
          <p className="my-4 text-center text-foreground/80 text-sm">
            Empty Tasks 🫡
          </p>
        ) : (
          filteredTodos?.map((t) => <TodoItem key={t.id} {...t} />)
        )}
      </div>
    </>
  );
}
