'use client';
import { useDeleteTodo } from '@/hooks/use-todos';
import { Button } from '../ui/button';
import { Trash2Icon } from 'lucide-react';
import { LoadingIcon } from '../common/icons';

export const TodoRemove = ({ id }: { id: string }) => {
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
