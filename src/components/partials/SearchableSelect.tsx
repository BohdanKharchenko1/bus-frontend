import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Button } from '../../components/ui/button';

type Option = {
  value: number;
};

interface SearchableSelectProps {
  options?: Option[];
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  className,
  disabled = false,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'justify-between border-2 h-[51px] min-w-0 w-full text-base md:text-lg font-normal',
            className,
          )}
        >
          {value !== undefined && value !== null ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 z-50" style={{ width: 'var(--radix-popover-trigger-width)' }}>
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  className={cn('sm:text-lg justify-center')}
                  key={option.value}
                  value={String(option.value)}
                  onSelect={(currentValue) => {
                    onChange?.(Number(currentValue));
                    console.log(Number(currentValue));
                    setOpen(false);
                  }}
                >
                  {option.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
