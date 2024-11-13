'use client';
import { useAddTodo } from '@/hooks/use-todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { LoadingIcon } from './common/icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const schema = z.object({
  title: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function AddTodo() {
  const { mutateAsync, isPending } = useAddTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSettled: () => {
        toast.success('Todo added successfully');
        reset();
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-end justify-center gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="task" className="w-fit">
            Task
          </Label>
          <Input
            id="task"
            type="text"
            className="bg-card"
            placeholder="enter task title"
            error={errors.title?.message}
            {...register('title')}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <LoadingIcon className="fill-primary-foreground" />
          ) : (
            <PlusCircleIcon />
          )}
          Add
        </Button>
      </div>
      {errors.title?.message && (
        <p className="mt-2 text-destructive text-xs">{errors.title?.message}</p>
      )}
    </form>
  );
}
