import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';

const TriggerButton = (
  <Button
    size={'icon'}
    variant={'outline'}
    className="size-8 text-teal-500 hover:text-teal-500"
  >
    <EditIcon />
  </Button>
);

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCharacterLimit } from '@/hooks/use-character-limit';
import { useUpdateTodo } from '@/hooks/use-todos';
import type { EditTaskFormProps, UpdateTodoProps } from './types';

export const TaskForm = ({
  onSubmit,
  maxLength = 45,
  clearOnSubmit = true,
  onClose,
  defaultTitle,
}: EditTaskFormProps) => {
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
    clear,
  } = useCharacterLimit({ maxLength, initialValue: defaultTitle });

  const handleSubmit = async () => {
    if (!value) return;

    if (clearOnSubmit) clear();
    if (onClose) onClose();
    await onSubmit({ title: value });
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
    </div>
  );
};

export function TodoEdit(props: UpdateTodoProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateTodo();

  const handleAddTodo = async ({ title }: { title: string }) => {
    await mutateAsync({ id: props.id, title });
  };

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          isPending={isPending}
          onSubmit={handleAddTodo}
          defaultTitle={props.title}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Task</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <TaskForm
            onSubmit={handleAddTodo}
            isPending={isPending}
            defaultTitle={props.title}
            onClose={() => setOpen(false)}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
