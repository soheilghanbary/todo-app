import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCharacterLimit } from '@/hooks/use-character-limit';
import { generateId } from '@/lib/utils';

export const TodoForm = ({
  onSubmit,
  maxLength = 45,
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
      <Button onClick={handleSubmit} className='mt-1'>Add Task</Button>
    </div>
  );
};
