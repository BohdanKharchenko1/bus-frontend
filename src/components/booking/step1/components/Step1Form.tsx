import { Controller, FieldErrors, UseFormReturn } from 'react-hook-form';
import { TFunction } from 'i18next';
import { SearchableSelect } from '@/components/partials/SearchableSelect.tsx';
import { SearchableInput } from '@/components/partials/SearchableInput.tsx';
import { DatePicker } from '@/components/booking/step1/components/DatePicker.tsx';
import { Step1FormValues } from '@/components/booking/step1/schema/step1Schema.ts';
import FieldGroup from '@/components/booking/step1/components/FieldGroup.tsx';

type Step1FormProps = {
  form: UseFormReturn<Step1FormValues>;
  t: TFunction<'step1'>;
  onSubmit: (values: Step1FormValues) => void;
  onError?: (errors: FieldErrors<Step1FormValues>) => void;
};

const passengerOptions = [1, 2, 3, 4, 5].map((n) => ({ value: n }));

const Step1Form = ({ form, t, onSubmit, onError }: Step1FormProps) => (
  <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col gap-6 w-full">
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
                options={passengerOptions}
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
);

export default Step1Form;
