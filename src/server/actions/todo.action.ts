'use server';
import { auth } from '../auth';
import { prisma } from '../db';

export async function getTodos(filter: string | null) {
  return await prisma.task.findMany({
    where: {
      completed:
        filter === 'completed' ? true : filter === 'not' ? false : undefined, // If filter is "all" or null, it retrieves all tasks
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createTodo(title: string) {
  const session = await auth();
  return await prisma.task.create({
    data: {
      title,
      userId: session?.user.id!,
    },
  });
}

export async function deleteTodo(id: string) {
  return await prisma.task.delete({
    where: { id },
  });
}

export async function updateTodo(id: string, title: string) {
  return await prisma.task.update({
    where: { id },
    data: { title },
  });
}

export const doneTodos = async (id: string, completed: boolean) => {
  return await prisma.task.update({
    where: { id },
    data: { completed },
  });
};
