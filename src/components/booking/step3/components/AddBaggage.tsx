import { UseFormReturn } from 'react-hook-form';
import { Step3FormValues } from '@/components/booking/step3/schema/step3Schema.ts';
import { BaggageItem } from '@/types/routes.ts';
import { TFunction } from 'i18next';
import { useMemo } from 'react';

type AddBaggageProps = {
  form: UseFormReturn<Step3FormValues>;
  routeIndex: number;
  passengerIndex: number;
  baggageThere: BaggageItem[];
  baggageBack?: BaggageItem[];
  t: TFunction<'step3'>;
};
export default function AddBaggage({
  form,
  passengerIndex,
  routeIndex,
  baggageThere,
  baggageBack,
  t,
}: AddBaggageProps) {
  const { getValues, setValue, watch } = form;
  const baggageValue = watch(`baggage.${routeIndex}.${passengerIndex}`) as string | null;
  const baggageList = routeIndex === 0 ? baggageThere : baggageBack;

  const { extraCount, extraPrice, extraCurrency } = useMemo(() => {
    const count = baggageValue ? baggageValue.split(',').filter(Boolean).length : 0;
    const item = baggageList?.[1];
    const price = item ? item.price * count : 0;
    const currency = item?.currency ?? '';
    return { extraCount: count, extraPrice: price, extraCurrency: currency };
  }, [baggageValue, baggageList]);

  const handleAddBaggage = () => {
    const baggageValue: string | null = getValues(`baggage.${routeIndex}.${passengerIndex}`);

    const baggageId: string | undefined =
      routeIndex === 0 ? baggageThere?.[1].baggage_id : baggageBack?.[1].baggage_id;

    const baggageToSave =
      baggageValue?.[routeIndex] === undefined
        ? String(baggageId)
        : baggageValue?.concat(',', baggageId!);
    setValue(`baggage.${routeIndex}.${passengerIndex}`, baggageToSave!);
  };
  const handleRemoveBaggage = () => {
    const baggageValue: string | null = getValues(`baggage.${routeIndex}.${passengerIndex}`);

    const baggageId: string | undefined =
      routeIndex === 0 ? baggageThere?.[1].baggage_id : baggageBack?.[1].baggage_id;

    const baggageTosSave = baggageValue?.includes(',')
      ? baggageValue?.replace(`,${baggageId}`, '')
      : null;
    setValue(`baggage.${routeIndex}.${passengerIndex}`, baggageTosSave!);
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 shadow-[0_8px_28px_-18px_rgba(15,23,42,0.3)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              {t('add_baggage_label')}
            </span>
            <span className="text-xs text-slate-500">{t('add_baggage_hint')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-10 w-10 rounded-xl bg-purple-600 text-white text-lg font-semibold shadow-sm hover:bg-purple-700 active:scale-[0.98] transition-all"
              onClick={handleAddBaggage}
            >
              +
            </button>
            <button
              type="button"
              className="h-10 w-10 rounded-xl border border-slate-200 text-slate-700 text-lg font-semibold bg-white hover:border-slate-300 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleRemoveBaggage}
              disabled={extraCount === 0}
            >
              −
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
          <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
              {t('extra_baggage_count')}
            </span>
            <span className="text-xl font-semibold text-slate-900">{extraCount}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
              {t('extra_baggage_total')}
            </span>
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-xl font-semibold text-slate-900">{extraPrice.toFixed(2)}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
                {extraCurrency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
