'use client';
import { useCharacterLimit } from '@/hooks/use-character-limit';
import { useAddTodo } from '@/hooks/use-todos';
import { generateId } from '@/lib/utils';
import { PlusCircleIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadingIcon } from './common/icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function AddTodo() {
  const maxLength = 30;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
    clear,
  } = useCharacterLimit({ maxLength });
  const { mutateAsync, isPending } = useAddTodo();

  const onSubmit = async () => {
    if (!value) return;

    const newTask = {
      id: generateId(),
      title: value,
      completed: false,
    };

    clear();

    return await mutateAsync(newTask);
  };

  return (
    <div className="flex items-end justify-center gap-2">
      <div className="flex flex-1 flex-col gap-2">
        <Label htmlFor="task" className="w-fit">
          Task
        </Label>
        <div className="relative">
          <Input
            id="input-34"
            className="peer pe-14"
            type="text"
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}
            aria-describedby="character-count"
            placeholder="enter task"
          />
          <div
            id="character-count"
            className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-xs tabular-nums peer-disabled:opacity-50"
            aria-live="polite"
            role="status"
          >
            {characterCount}/{limit}
          </div>
        </div>
      </div>
      <Button type="button" onClick={onSubmit} disabled={isPending}>
        {isPending ? (
          <LoadingIcon className="fill-primary-foreground" />
        ) : (
          <PlusCircleIcon />
        )}
        Add
      </Button>
    </div>
  );
}
