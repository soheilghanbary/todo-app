import { Label } from '@/components/ui/label';
import { useCharacterLimit } from '@/hooks/use-character-limit';
import { generateId } from '@/lib/utils';
import { PlusCircleIcon } from 'lucide-react';
import { LoadingIcon } from './common/icons';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const TaskForm = ({
  onSubmit,
  isPending,
  maxLength = 30,
  clearOnSubmit = true,
  onClose,
}: {
  onSubmit: (task: {
    id: string;
    title: string;
    completed: boolean;
  }) => Promise<void>;
  isPending: boolean;
  maxLength?: number;
  clearOnSubmit?: boolean;
  onClose?: () => void;
}) => {
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
    clear,
  } = useCharacterLimit({ maxLength });

  const handleSubmit = async () => {
    if (!value) return;

    const newTask = { id: generateId(), title: value, completed: false };
    if (clearOnSubmit) clear();
    if (onClose) onClose();
    await onSubmit(newTask);
  };

  return (
    <div className="flex items-end justify-center gap-2">
      <div className="flex flex-1 flex-col gap-2">
        <Label htmlFor="task" className="w-fit">
          Task
        </Label>
        <div className="relative">
          <Input
            id="task-input"
            className="peer pe-14"
            type="text"
            value={value}
            maxLength={limit}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            aria-describedby="character-count"
            placeholder="Enter task"
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
      <Button type="button" onClick={handleSubmit} disabled={isPending}>
        {isPending ? (
          <LoadingIcon className="fill-primary-foreground" />
        ) : (
          <PlusCircleIcon />
        )}
        Add
      </Button>
    </div>
  );
};
