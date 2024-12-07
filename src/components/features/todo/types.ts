import type { Task } from '@prisma/client';

export type UpdateTodoProps = Pick<Task, 'id' | 'title'>;

export type EditTaskFormProps = {
  onSubmit: (task: {
    title: string;
  }) => Promise<void>;
  isPending: boolean;
  maxLength?: number;
  clearOnSubmit?: boolean;
  onClose?: () => void;
  defaultTitle: string;
};
