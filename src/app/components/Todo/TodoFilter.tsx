'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FilterIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { type MouseEvent, useState } from 'react';
import { Button } from '@/components/ui/button';

export const TodoFilter = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useQueryState('filter');

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setFilter(name === 'all' ? null : name);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="flat" size="sm">
          <FilterIcon />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-1">
        <div className="flex flex-col gap-2">
          {['all', 'completed', 'active'].map((filterOption) => (
            <Button
              size="sm"
              variant="ghost"
              key={filterOption}
              name={filterOption}
              onClick={handleFilter}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
