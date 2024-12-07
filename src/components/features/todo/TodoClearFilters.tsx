import { XIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

export default () => {
  const [filter, setFilter] = useQueryState('filter');
  if (!filter) return null;
  return (
    <button
      type="button"
      onClick={() => setFilter(null)}
      className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
    >
      Clear Filters <XIcon className="size-3" />
    </button>
  );
};
