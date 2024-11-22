import { Checkbox } from '@/components/ui/checkbox';
import { useCompleteTodo } from '@/hooks/use-todos';

type CompleteTodoProps = {
  id: string;
  completed: boolean;
};

export const TodoDone = ({ id, completed }: CompleteTodoProps) => {
  const { mutateAsync, isPending } = useCompleteTodo();

  const handleComplete = async () => {
    await mutateAsync({ id, completed: !completed });
  };

  return (
    <Checkbox id={id} checked={completed} onCheckedChange={handleComplete} />
  );
};
