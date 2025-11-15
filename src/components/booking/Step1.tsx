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
import { useEffect } from 'react';
import { DatePicker } from '../partials/DatePicker.tsx';

const FormSchema = z.object({
  from: z.custom<Point>(),
  to: z.custom<Point>(),
  startDate: z
    .string()
    .optional()
    .refine((val) => !val || new Date(val) >= new Date(), {
      message: 'Cant be less than today',
    }),
  endDate: z
    .string()
    .optional()
    .refine((val) => !val || new Date(val) >= new Date(), {
      message: 'Cant be less than today',
    }),
  passengerCount: z.number().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

type Step1Props = {
  onNext?: () => void;
};

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
    <div className="max-w-7xl mx-auto pt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{t('title')}</CardTitle>
        </CardHeader>

        <CardContent className="pt-4 px-4 md:px-6 overflow-visible">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div className="flex flex-wrap items-end gap-4 w-full">
              <div className="flex flex-col gap-1 flex-[1_1_12rem]">
                <Label className="text-base">{t('from')}</Label>
                <Controller
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <SearchableInput value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>

              {/* To */}
              <div className="flex flex-col gap-1 flex-[1_1_12rem]">
                <Label className="text-base">{t('to')}</Label>
                <Controller
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <SearchableInput value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>

              {/* Dates */}
              <div className="flex flex-row gap-1 flex-[1_1_15rem]">
                <div className="flex flex-col gap-1 flex-1">
                  <Label className="text-base">{t('departureDate')}</Label>
                  <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker value={field.value ?? null} onChange={field.onChange} />
                    )}
                  ></Controller>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <Label className="text-base">{t('returnDate')}</Label>
                  <Controller
                    name="endDate"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker value={field.value ?? null} onChange={field.onChange} />
                    )}
                  ></Controller>
                </div>
              </div>

              {/* Passengers */}
              <div className="flex flex-col gap-1 flex-[0_1_10rem]">
                <Label className="text-base">{t('passengers')}</Label>
                <Controller
                  name="passengerCount"
                  control={form.control}
                  render={({ field }) => (
                    <SearchableSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={[1, 2, 3, 4, 5].map((n) => ({
                        value: n,
                      }))}
                      placeholder="1"
                    />
                  )}
                />
              </div>

              {/* Button */}
              <div className="flex flex-col justify-end flex-[0_1_auto]">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base md:text-lg px-6 py-3 rounded-md whitespace-nowrap"
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
