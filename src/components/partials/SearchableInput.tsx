import { cn } from '../../lib/utils';
import { Command, CommandGroup, CommandItem, CommandList } from '../../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../../components/ui/input';
import { getPoints } from '../../api/bus';

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
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchableInput({
  value,
  onChange,
  placeholder = 'Search location',
  className,
  disabled = false,
}: SearchableInputProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Point[]>([]);
  const [query, setQuery] = useState(value?.point_name ?? '');
  const [chosen, setChosen] = useState(!!value);

  const clicked = useRef(false);

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

    const timeout = setTimeout(fetchPoints, 400);
    return () => clearTimeout(timeout);
  }, [query, chosen]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      if (!clicked.current && !chosen && options.length > 0) {
        const first = options[0];
        onChange?.(first);
        setQuery(first.point_name);
        setChosen(true);
      }
      clicked.current = false;
    }

    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'py-3 h-[51px] text-base md:text-lg border-2 w-full min-w-0',
            className,
          )}
          placeholder={placeholder}
          disabled={disabled}
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
                      clicked.current = true;
                      onChange?.(option);
                      setQuery(option.point_name);
                      setChosen(true);
                      setOpen(false);
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
