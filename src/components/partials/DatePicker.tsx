import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { cn } from '../../lib/utils';

type Props = {
  onChange: (value: string | null) => void;
  value: string | null;
  className?: string;
  placeholder?: string;
};
export function DatePicker({ value, onChange, className, placeholder = 'Select date' }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('justify-between font-normal h-[51px] md:text-lg text-base', className)}
          >
            {value ? new Date(value).toLocaleDateString() : placeholder}
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            captionLayout="dropdown"
            onSelect={(newDate) => {
              onChange(newDate ? newDate.toISOString() : null);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
