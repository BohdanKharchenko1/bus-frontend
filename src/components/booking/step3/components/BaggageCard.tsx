import { BaggageItem, RouteItemType } from '@/types/routes.ts';
import { TFunction } from 'i18next';
import { UseFormReturn } from 'react-hook-form';
import { Step3FormValues } from '../schema/step3Schema.ts';
import AddBaggage from '../components/AddBaggage.tsx';

type BaggageCardProps = {
  passengerIndex: number;
  form: UseFormReturn<Step3FormValues>;
  routeThere?: RouteItemType;
  routeBack?: RouteItemType;
  t: TFunction<'step3'>;
  baggageThere?: BaggageItem[];
  baggageBack?: BaggageItem[];
  index: number;
};
export default function BaggageCard({
  routeThere,
  routeBack,
  passengerIndex,
  form,
  t,
  baggageThere,
  baggageBack,
  index,
}: BaggageCardProps) {
  const getBaggageTitle = (title: string | undefined) => {
    if (!title) return '';
    const key = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    return key ? t(`baggage_titles.${key}`, { defaultValue: title }) : title;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {index === 0 && routeThere && baggageThere?.[0] && (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="flex items-start justify-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {t('baggage_for_route')} — {t('outbound')}
              </span>

              <span className="text-sm text-slate-600">
                {routeThere?.point_from} → {routeThere?.point_to}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr_1fr_auto] gap-4 items-center">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 uppercase tracking-[0.08em]">
                {t('baggage_type_label')}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {getBaggageTitle(baggageThere[0].baggage_title)}
              </span>
            </div>

            <div className="text-sm text-slate-700">
              {`${baggageThere[0].length}x${baggageThere[0].width}x${baggageThere[0].height}cm, ${baggageThere[0].kg}kg `}
            </div>

            <div className="text-sm text-slate-700">
              {t('baggage_included', { value: baggageThere[0].max_per_person })}
            </div>
            <div className="sm:col-span-4 justify-self-stretch">
              <AddBaggage
                t={t}
                baggageThere={baggageThere}
                baggageBack={baggageBack}
                form={form}
                passengerIndex={passengerIndex}
                routeIndex={0}
              />
            </div>
          </div>
        </div>
      )}

      {index === 1 && routeBack && baggageBack?.[0] && (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="flex items-start justify-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {t('baggage_for_route')} — {t('return')}
              </span>

              <span className="text-sm text-slate-600">
                {routeBack?.point_from} → {routeBack?.point_to}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr_1fr_auto] gap-4 items-end">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 uppercase tracking-[0.08em]">
                {t('baggage_type_label')}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {getBaggageTitle(baggageBack[0].baggage_title)}
              </span>
            </div>

            <div className="text-sm text-slate-700">
              {`${baggageBack[0].length}x${baggageBack[0].width}x${baggageBack[0].height}cm, ${baggageBack[0].kg}kg `}
            </div>

            <div className="text-sm text-slate-700">
              {t('baggage_included', { value: baggageBack[0].max_per_person })}
            </div>
            <div className="sm:col-span-4 justify-self-stretch">
              <AddBaggage
                t={t}
                baggageThere={baggageThere!}
                baggageBack={baggageBack}
                form={form}
                passengerIndex={passengerIndex}
                routeIndex={1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
