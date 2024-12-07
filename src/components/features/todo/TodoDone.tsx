import { Checkbox } from '@/components/ui/checkbox';
import { useCompleteTodo } from '@/hooks/use-todos';

type Props = {
  id: string;
  completed: boolean;
};

export default ({ id, completed }: Props) => {
  const { mutateAsync } = useCompleteTodo();
  const handleComplete = async () => {
    await mutateAsync({ id, completed: !completed });
  };
  return (
    <Checkbox id={id} checked={completed} onCheckedChange={handleComplete} />
  );
};
