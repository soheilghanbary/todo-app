'use client';
import { useClearTodos } from '@/hooks/use-todos';
import toast from 'react-hot-toast';

export const TodoClear = ({ todos = 0 }) => {
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
      disabled={isPending || todos === 0}
      onClick={handleClick}
    >
      Clear Tasks
    </button>
  );
};
