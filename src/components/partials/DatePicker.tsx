import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { Label } from '../../components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';

type Props = {
  onChange: (value: string | null) => void;
  value: string | null;
};
export function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-48 justify-between font-normal">
            {value ? new Date(value).toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
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
