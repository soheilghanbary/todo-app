'use client';
import { useTodos } from '@/hooks/use-todos';
import NumberFlow from '@number-flow/react';
import { AnimatePresence, motion } from 'motion/react';
import { useQueryState } from 'nuqs';
import TodoClearFilters from './TodoClearFilters';
import TodoEmpty from './TodoEmpty';
import TodoFilter from './TodoFilter';
import TodoItem from './TodoItem';
import TodoLoading from './TodoLoading';

const TodoList = () => {
  const [filter] = useQueryState('filter');
  const { data: todos, isPending } = useTodos();

  if (isPending) {
    return <TodoLoading />;
  }

  const filteredTodos = todos?.filter((todo) => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });

  const tasksCount = filteredTodos?.length || 0;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2">
        <TodoFilter />
        <TodoClearFilters />
        <h2 className="flex-1 text-right font-medium text-sm">
          <NumberFlow
            aria-hidden
            willChange
            format={{ useGrouping: false }}
            value={tasksCount}
          />
          {' Tasks'}
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {tasksCount === 0 ? (
          <TodoEmpty />
        ) : (
          <AnimatePresence>
            {filteredTodos?.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <TodoItem {...task} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TodoList;
