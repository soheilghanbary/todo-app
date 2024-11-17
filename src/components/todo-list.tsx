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
import { AnimatePresence, motion } from 'motion/react';
import { useQueryState } from 'nuqs';
import { type MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingIcon } from './common/icons';
import { Button } from './ui/button';

type CompleteTodoProps = {
  id: string;
  completed: boolean;
};

const CompleteTodo = ({ id, completed }: CompleteTodoProps) => {
  const { mutateAsync, isPending } = useCompleteTodo();

  const handleComplete = async () => {
    await mutateAsync({ id, completed: !completed });
  };

  return (
    <Checkbox id={id} checked={completed} onCheckedChange={handleComplete} />
  );
};

const DeleteTodo = ({ id }: { id: string }) => {
  const { mutateAsync, isPending } = useDeleteTodo();

  const handleDelete = async () => {
    await mutateAsync(id);
  };

  return (
    <Button
      size="icon"
      variant="outline"
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

const TodoItem = ({ id, title, completed, createdAt }: Task) => (
  <div className="rounded-md border bg-muted/40 p-2 shadow-sm">
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn('flex w-fit cursor-pointer items-center gap-2 text-sm', {
          'text-muted-foreground line-through': completed,
        })}
      >
        <CompleteTodo id={id} completed={completed} />
        <p>{title}</p>
      </label>
      <div className="flex items-center justify-between gap-2">
        <p className="flex-1 text-muted-foreground text-xs">
          {fromNow(createdAt)}
        </p>
        <DeleteTodo id={id} />
      </div>
    </div>
  </div>
);

const FilterTodo = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useQueryState('filter');

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setFilter(name === 'all' ? null : name);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="flat" size="sm">
          <FilterIcon />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-2">
        <div className="flex flex-col gap-2">
          {['all', 'completed', 'active'].map((filterOption) => (
            <Button
              key={filterOption}
              name={filterOption}
              size="sm"
              variant="flat"
              onClick={handleFilter}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ClearTodos = () => {
  const { isPending, mutateAsync } = useClearTodos();

  const handleClick = () => {
    mutateAsync(undefined, {
      onSuccess: () => toast.success('Cleared all tasks'),
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
};

export const TodoList = () => {
  const [filter] = useQueryState('filter');
  const { data: todos, isPending } = useTodos();

  if (isPending) {
    return <LoadingIcon className="mx-auto my-8 size-5 fill-primary" />;
  }

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
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
            value={filteredTodos?.length || 0}
          />
          {' Tasks'}
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {!filteredTodos?.length ? (
          <p className="my-4 text-center text-foreground/80 text-sm">
            Empty Tasks 🫡
          </p>
        ) : (
          <AnimatePresence>
            {filteredTodos.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <TodoItem {...task} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </>
  );
};
