import {
  createTodo,
  deleteTodo,
  doneTodos,
  getTodos,
} from '@/server/actions/todo.action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTodos = (filter: string | null) => {
  return useQuery({
    queryKey: ['todos', filter],
    queryFn: () => getTodos(filter),
  });
};

export const useAddTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ title }: { title: string }) => createTodo(title),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useCompleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      doneTodos(id, completed),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
