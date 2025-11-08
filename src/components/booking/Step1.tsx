import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableSelect } from '../../components/partials/SearchableSelect';
import { useBookingStore } from '../../stores/bookingStore';
import { useEffect } from 'react';
import { getPoints } from '../../api/bus.ts';
import { useShallow } from 'zustand/react/shallow';

const FormSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  passengerCount: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Step1() {
  const { from, to, startDate, endDate, passengerCount } = useBookingStore(
    useShallow((state) => ({
      from: state.from,
      to: state.to,
      startDate: state.startDate,
      endDate: state.endDate,
      passengerCount: state.passengerCount,
    })),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: from || '',
      to: to || '',
      startDate: startDate || '',
      endDate: endDate || '',
      passengerCount: String(passengerCount || ''),
    },
  });

  const { control } = form;
  const fromWatch = useWatch({ control, name: 'from' });
  useEffect(() => {
    if (fromWatch!.length > 2) {
      const response = getPoints({ autocomplete: fromWatch! }).then((res) => console.log(res));
      console.log(response);
    }
  }, [fromWatch]);
  return (
    <div className="max-w-[100rem] mx-auto pt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Шаг 1 — Выбор маршрута</CardTitle>
        </CardHeader>

        <CardContent className="pt-4 px-6 overflow-visible">
          <form className="flex flex-row items-stretch gap-8">
            {/* FROM */}
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Откуда</Label>
              <Input
                {...form.register('from')}
                className="py-6 md:text-lg border-2"
                type="search"
              />
            </div>

            {/* TO */}
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Куда</Label>
              <Input {...form.register('to')} className="py-6 md:text-lg border-2" type="search" />
            </div>

            {/* DATES */}
            <div className="flex gap-0">
              <div className="flex flex-col gap-2">
                <Label className="text-lg">Дата выезда</Label>
                <Input
                  {...form.register('startDate')}
                  type="date"
                  className="appearance-none py-6 md:text-lg border-2 rounded-l-md rounded-r-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-lg">Дата возврата</Label>
                <Input
                  {...form.register('endDate')}
                  type="date"
                  className="appearance-none py-6 md:text-lg border-2 rounded-r-md rounded-l-none border-l-0"
                />
              </div>
            </div>

            {/* PASSENGERS */}
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Пассажиры</Label>
              <Controller
                name="passengerCount"
                control={form.control}
                render={({ field }) => (
                  <SearchableSelect
                    className=""
                    value={field.value}
                    options={[1, 2, 3, 4, 5].map((n) => ({
                      value: String(n),
                      label: `${n} ${n === 1 ? 'Пассажир' : 'Пассажира'}`,
                    }))}
                  />
                )}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
