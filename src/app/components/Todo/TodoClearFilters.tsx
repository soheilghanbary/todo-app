import { XIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

export function TodoClearFilters() {
  const [filter, setFilter] = useQueryState('filter');

  if (!filter) return null;

  return (
    <button
      type="button"
      className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
      onClick={() => setFilter(null)}
    >
      Clear Filters <XIcon className="size-3" />
    </button>
  );
}
