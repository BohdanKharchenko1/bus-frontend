import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cs, enUS, ru, uk } from 'date-fns/locale';
import i18n from 'i18next';

import { Button } from '../../../ui/button';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { cn } from '../../../../lib/utils';

type Props = {
  onChange: (value: string | null) => void;
  value: string | null;
  className?: string;
  placeholder?: string;
};

const localeMap = {
  cs,
  en: enUS,
  ru,
  ua: uk,
} as const;

const getLocale = (language: string | undefined) => {
  const normalized = language?.split('-')[0] ?? 'en';
  return localeMap[normalized as keyof typeof localeMap] ?? enUS;
};

export function DatePicker({ value, onChange, className, placeholder = 'Select date' }: Props) {
  const [open, setOpen] = React.useState(false);
  const locale = getLocale(i18n.language);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('justify-between font-normal h-[51px] md:text-lg text-base', className)}
          >
            {value ? format(new Date(value), 'P', { locale }) : placeholder}
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            locale={locale}
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
