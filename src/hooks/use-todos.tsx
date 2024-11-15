import {
  clearTodos,
  createTodo,
  deleteTodo,
  doneTodos,
  getTodos,
} from '@/server/actions/todo.action';
import type { Task } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};

export const useAddTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: AddTaskProps) => createTodo(values),
    onMutate: async (newTodo) => {
      await qc.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = qc.getQueryData(['todos']);
      qc.setQueryData(['todos'], (oldTodos: any) => [
        {
          ...newTodo,
          completed: false,
          createdAt: new Date(),
        },
        ...oldTodos,
      ]);
      toast.success('Todo added successfully');
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      qc.setQueryData(['todos'], context?.previousTodos);
    },
  });
};

export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = qc.getQueryData(['todos']);
      qc.setQueryData(['todos'], (oldTodos: any) =>
        oldTodos?.filter((todo: any) => todo.id !== id),
      );
      toast.success('Todo deleted successfully');
      return { previousTodos };
    },
    onError: (err, id, context) => {
      qc.setQueryData(['todos'], context?.previousTodos);
    },
  });
};

export const useCompleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: Pick<Task, 'id' | 'completed'>) =>
      doneTodos(id, completed),
    onMutate: async ({ id, completed }) => {
      await qc.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = qc.getQueryData(['todos']);
      qc.setQueryData(['todos'], (oldTodos: any) =>
        oldTodos?.map((todo: any) =>
          todo.id === id ? { ...todo, completed } : todo,
        ),
      );
      return { previousTodos };
    },
    onError: (err, { id, completed }, context) => {
      qc.setQueryData(['todos'], context?.previousTodos);
    },
  });
};

export const useClearTodos = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: clearTodos,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = qc.getQueryData(['todos']);
      qc.setQueryData(['todos'], []);
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      qc.setQueryData(['todos'], context?.previousTodos);
    },
  });
};
