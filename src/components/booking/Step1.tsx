import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableSelect } from '../partials/SearchableSelect';
import { useBookingStore } from '../../stores/bookingStore';
import { useShallow } from 'zustand/react/shallow';
import { Point, SearchableInput } from '../partials/SearchableInput';
import { useTranslation } from 'react-i18next';
import { ReactNode, useEffect } from 'react';
import { DatePicker } from '../partials/DatePicker.tsx';
import { cn } from '../../lib/utils';

const FormSchema = z.object({
  from: z.custom<Point>(),
  to: z.custom<Point>(),
  startDate: z.string().refine((val) => {
    if (!val) return;
    const selectedDate = new Date(val);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }),
  endDate: z
    .string()
    .optional()
    .refine((val) => {
      if (val === '') return true;
      const selectedDate = new Date(val!);
      const today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  passengerCount: z.number().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

type Step1Props = {
  onNext?: () => void;
};

type FieldGroupProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

const FieldGroup = ({ label, children, className }: FieldGroupProps) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <Label className="text-sm font-medium text-muted-foreground md:text-base">{label}</Label>
    {children}
  </div>
);

export default function Step1({ onNext }: Step1Props) {
  const { t } = useTranslation('step1');
  const { from, to, startDate, endDate, passengerCount, setStep1 } = useBookingStore(
    useShallow((state) => ({
      from: state.from,
      to: state.to,
      startDate: state.startDate,
      endDate: state.endDate,
      passengerCount: state.passengerCount,
      setStep1: state.setStep1,
    })),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: from ?? undefined,
      to: to ?? undefined,
      startDate: startDate || '',
      endDate: endDate || '',
      passengerCount: passengerCount,
    },
  });
  useEffect(() => {
    useBookingStore.persist.rehydrate();
  }, []);
  const onSubmit = (data: FormValues) => {
    console.log(data);
    setStep1(data);
    onNext?.();
  };

  return (
    <div className="max-w-7xl mx-auto pt-8 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{t('title')}</CardTitle>
        </CardHeader>

        <CardContent className="pt-4 px-4 md:px-6 overflow-visible">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 lg:[grid-template-columns:repeat(11,minmax(0,1fr))_auto] lg:gap-6">
              <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-3 w-full">
                <FieldGroup label={t('from')}>
                  <Controller
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <SearchableInput value={field.value} onChange={field.onChange} />
                    )}
                  />
                </FieldGroup>
              </div>

              <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-3 w-full">
                <FieldGroup label={t('to')}>
                  <Controller
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <SearchableInput value={field.value} onChange={field.onChange} />
                    )}
                  />
                </FieldGroup>
              </div>

              <div className="min-w-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:col-span-2 md:col-span-6 lg:col-span-4">
                <FieldGroup label={t('departureDate')}>
                  <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value ?? null}
                        onChange={field.onChange}
                        className="w-full"
                      />
                    )}
                  />
                </FieldGroup>

                <FieldGroup label={t('returnDate')}>
                  <Controller
                    name="endDate"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value ?? null}
                        onChange={field.onChange}
                        className="w-full"
                      />
                    )}
                  />
                </FieldGroup>
              </div>

              <div className="min-w-0 sm:col-span-1 md:col-span-3 lg:col-span-1 w-full">
                <FieldGroup label={t('passengers')}>
                  <Controller
                    name="passengerCount"
                    control={form.control}
                    render={({ field }) => (
                      <SearchableSelect
                        value={field.value}
                        onChange={field.onChange}
                        options={[1, 2, 3, 4, 5].map((n) => ({ value: n }))}
                        placeholder="1"
                        className="w-full"
                      />
                    )}
                  />
                </FieldGroup>
              </div>

              <div className="min-w-0 flex w-full sm:col-span-2 md:col-span-3 lg:col-span-1 lg:col-start-12 items-end justify-end">
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base md:text-lg px-6 rounded-md h-[51px] md:w-auto lg:w-full"
                >
                  {t('findConnection')}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
