'use client';
import { LoadingIcon } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { useDeleteTodo } from '@/hooks/use-todos';
import { Trash2Icon } from 'lucide-react';

export default ({ id }: { id: string }) => {
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
