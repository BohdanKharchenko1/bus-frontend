import { cn } from '../../lib/utils';
import { Command, CommandGroup, CommandItem, CommandList } from '../../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input.tsx';
import { getPoints } from '../../api/bus.ts';

export type Point = {
  point_id: number;
  point_name: string;
  country_name: string;
  currency: string;
  time_zone: number;
};

interface SearchableInputProps {
  value?: Point | null;
  onChange?: (value: Point | null) => void;
}

export function SearchableInput({ value, onChange }: SearchableInputProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Point[]>([]);
  const [query, setQuery] = useState(value?.point_name ?? '');
  const [chosen, setChosen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPoints = async () => {
      if (chosen) return;
      if (query.length < 3) {
        setOptions([]);
        setOpen(false);
        return;
      }
      try {
        const res = await getPoints({ autocomplete: query, lang: 'cz' });
        setOptions(res.data || []);
        setOpen(true);
      } catch (err) {
        console.error('Failed to fetch points', err);
      }
    };

    const debounce = setTimeout(fetchPoints, 400);
    return () => clearTimeout(debounce);
  }, [query, chosen]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          className="py-6 md:text-lg border-2"
          type="search"
          value={query}
          onChange={(e) => {
            setChosen(false);
            setQuery(e.target.value);
            onChange?.({
              ...(value ?? {}),
              point_name: e.target.value,
            } as Point);
          }}
        />
      </PopoverTrigger>
      {options.length > 0 && (
        <PopoverContent
          side="bottom"
          align="start"
          className="p-0 z-50 w-[var(--radix-popover-trigger-width)]"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.point_id}
                    value={option.point_name}
                    className={cn('sm:text-lg')}
                    onSelect={() => {
                      onChange?.(option);
                      setQuery(option.point_name);
                      setOpen(false);
                      setChosen(true);
                    }}
                  >
                    {option.point_name} ({option.country_name})
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
