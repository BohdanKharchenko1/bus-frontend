import { Controller, FieldError, FieldErrors, UseFormReturn } from 'react-hook-form';
import { TFunction } from 'i18next';
import { SearchableSelect } from '../../../partials/SearchableSelect.tsx';
import { SearchableInput } from '../../../partials/SearchableInput.tsx';
import { DatePicker } from '../components/DatePicker.tsx';
import { Step1FormValues } from '../schema/step1Schema.ts';
import FieldGroup from './FieldGroup.tsx';
import FormError from '../../../partials/FormError.tsx';

type Step1FormProps = {
  form: UseFormReturn<Step1FormValues>;
  t: TFunction<'step1'>;
  onSubmit: (values: Step1FormValues) => void;
  onError?: (errors: FieldErrors<Step1FormValues>) => void;
  showReturnDate?: boolean;
  showCurrency?: boolean;
};

const passengerOptions = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ value: n }));
const currencyOptions = ['UAH', 'CZK'].map((value) => ({ value }));
const mobileInputClass = 'text-lg sm:text-base md:text-base';

export const Step1Form = ({
  form,
  t,
  onSubmit,
  onError,
  showReturnDate = false,
  showCurrency = true,
}: Step1FormProps) => {
  const {
    formState: { errors },
  } = form;
  const desktopGridClassName = showReturnDate
    ? showCurrency
      ? 'lg:[grid-template-columns:repeat(12,minmax(0,1fr))_auto]'
      : 'lg:[grid-template-columns:repeat(11,minmax(0,1fr))_auto]'
    : 'lg:[grid-template-columns:repeat(10,minmax(0,1fr))_auto]';
  const submitColumnClass = showReturnDate
    ? showCurrency
      ? 'lg:col-start-13'
      : 'lg:col-start-12'
    : 'lg:col-start-11';
  const gridClassName = `grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 ${desktopGridClassName} lg:gap-6`;

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col sm:gap-6 w-full">
      <div className={gridClassName}>
        <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-3 w-full">
          <FieldGroup label={t('from')}>
            <Controller
              control={form.control}
              name="from"
              render={({ field }) => (
                <SearchableInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('searchLocation')}
                  className={mobileInputClass}
                />
              )}
            />
            <FormError error={errors.from as FieldError | undefined} />
          </FieldGroup>
        </div>

        <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-3 w-full">
          <FieldGroup label={t('to')}>
            <Controller
              control={form.control}
              name="to"
              render={({ field }) => (
                <SearchableInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('searchLocation')}
                  className={mobileInputClass}
                />
              )}
            />
            <FormError error={errors.to as FieldError | undefined} />
          </FieldGroup>
        </div>

        <div className="min-w-0  sm:col-span-2 md:col-span-3 lg:col-span-2">
          <FieldGroup label={t('departureDate')}>
            <Controller
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ?? null}
                  onChange={field.onChange}
                  className={`w-full ${mobileInputClass}`}
                  placeholder={t('selectDate')}
                />
              )}
            />
            <FormError error={errors.startDate} />
          </FieldGroup>
        </div>

        {showReturnDate ? (
          <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-3">
            <FieldGroup label={t('returnDate')}>
              <Controller
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ?? null}
                    onChange={field.onChange}
                    className={`w-full ${mobileInputClass}`}
                    placeholder={t('selectDate')}
                  />
                )}
              />
              <FormError error={errors.endDate as FieldError | undefined} />
            </FieldGroup>
          </div>
        ) : null}

        <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-1 w-full">
          <FieldGroup label={t('passengers')}>
            <Controller
              name="passengerCount"
              control={form.control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onChange={(value) => field.onChange(Number(value))}
                  options={passengerOptions}
                  placeholder="1"
                  className={`w-full ${mobileInputClass}`}
                />
              )}
            />
            <FormError error={errors.passengerCount} />
          </FieldGroup>
        </div>

        {showCurrency ? (
          <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-1 w-full">
            <FieldGroup label={t('currency')}>
              <Controller
                name="currency"
                control={form.control}
                render={({ field }) => (
                  <SearchableSelect
                    value={field.value}
                    onChange={(value) => field.onChange(String(value))}
                    options={currencyOptions}
                    placeholder="CZK"
                    className={`w-full ${mobileInputClass}`}
                  />
                )}
              />
              <FormError error={errors.currency} />
            </FieldGroup>
          </div>
        ) : null}

        <div className={`min-w-0 sm:col-span-2 md:col-span-3 ${submitColumnClass} lg:col-span-1 w-full`}>
          <div className="flex flex-col gap-2">
            <div className="h-[24px]" />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base md:text-lg px-6 rounded-md h-[51px]"
            >
              {t('findConnection')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
