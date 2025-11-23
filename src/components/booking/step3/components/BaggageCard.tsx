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
};
export default function BaggageCard({
  routeThere,
  routeBack,
  passengerIndex,
  form,
  t,
  baggageThere,
  baggageBack,
}: BaggageCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {routeThere && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800 tracking-wide">
              {t('baggage_for_route')} — {t('outbound')}
            </span>

            <span className="text-xs text-gray-500 mt-0.5">
              {routeThere?.point_from} → {routeThere?.point_to}
            </span>
            {baggageThere && (
              <div className="grid grid-cols-3 items-center py-3 ">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Тип багажа</span>
                  <span className="text-md font-semibold">{baggageThere?.[0].baggage_title}</span>
                </div>

                <div className="text-sm text-gray-600">{`${baggageThere[0].length}x${baggageThere[0].width}x${baggageThere[0].height}cm, ${baggageThere[0].kg}kg `}</div>

                <div className="text-sm text-gray-700">
                  {`${baggageThere[0].max_per_person} включительно`}
                </div>
                <AddBaggage
                  baggageThere={baggageThere}
                  baggageBack={baggageBack}
                  form={form}
                  passengerIndex={passengerIndex}
                  routeIndex={0}
                />
              </div>
            )}
          </div>

          <div></div>
        </div>
      )}

      {routeBack && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800 tracking-wide">
              {t('baggage_for_route')} — {t('return')}
            </span>

            <span className="text-xs text-gray-500 mt-0.5">
              {routeBack?.point_from} → {routeBack?.point_to}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
