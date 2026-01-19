import { Card, CardContent, CardHeader } from '../../../ui/card.tsx';
import { UseFormReturn } from 'react-hook-form';
import { TFunction } from 'i18next';
import { Step3FormValues } from '../schema/step3Schema.ts';
import { DiscountGroup } from '../utils/price.ts';
import { BaggageItem, RouteItemType } from '../../../../types/routes.ts';
import FormError from '../../../partials/FormError.tsx';
import SelectTicket from './SelectTicket.tsx';
import BaggageCard from './BaggageCard.tsx';

type PassengerCardProps = {
  passengerIndex: number;
  form: UseFormReturn<Step3FormValues>;
  discountsThere?: DiscountGroup;
  discountsBack?: DiscountGroup;
  baggageThere?: BaggageItem[];
  baggageBack?: BaggageItem[];
  routeThere?: RouteItemType;
  routeBack?: RouteItemType;
  t: TFunction<'step3'>;
};

const PassengerCard = ({
  passengerIndex,
  form,
  discountsThere,
  discountsBack,
  routeThere,
  routeBack,
  t,
  baggageThere,
  baggageBack,
}: PassengerCardProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.28)] overflow-hidden bg-white ">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-500 text-white font-semibold flex items-center justify-center shadow-sm">
            {passengerIndex + 1}
          </div>
          <div className="flex flex-col">
            <span className="text-s uppercase tracking-[0.14em] text-slate-400">Passenger</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 px-4 py-4 sm:px-6 sm:py-6 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">{t('name')}</label>
            <input
              {...register(`name.${passengerIndex}`)}
              placeholder={t('name')}
              className="h-12 px-4 rounded-xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all outline-none text-slate-900"
            />
            <FormError error={errors.name?.[passengerIndex]} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">{t('last_name')}</label>
            <input
              {...register(`surname.${passengerIndex}`)}
              placeholder={t('last_name')}
              className="h-12 px-4 rounded-xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all outline-none text-slate-900"
            />
            <FormError error={errors.surname?.[passengerIndex]} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {discountsThere && (
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white shadow-[0_12px_36px_-20px_rgba(15,23,42,0.4)] p-4">
              <div className="flex items-start justify-center gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {t('discount_for_route_outbound')}
                  </span>

                  <span className="text-sm text-slate-600">
                    {routeThere?.point_from} → {routeThere?.point_to}
                  </span>
                </div>
              </div>

              <SelectTicket
                routeIndex={0}
                passengerIndex={passengerIndex}
                options={discountsThere.discounts}
                form={form}
              />
              <BaggageCard
                t={t}
                form={form}
                baggageBack={baggageBack}
                baggageThere={baggageThere}
                routeThere={routeThere}
                routeBack={routeBack}
                passengerIndex={passengerIndex}
                index={0}
              />
            </div>
          )}

          {discountsBack && (
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white shadow-[0_12px_36px_-20px_rgba(15,23,42,0.4)] p-4">
              <div className="flex items-start justify-center gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {t('discount_for_route_return')}
                  </span>

                  <span className="text-sm text-slate-600">
                    {routeBack?.point_from} → {routeBack?.point_to}
                  </span>
                </div>
              </div>

              <SelectTicket
                routeIndex={1}
                passengerIndex={passengerIndex}
                options={discountsBack.discounts}
                form={form}
              />
              <BaggageCard
                t={t}
                form={form}
                baggageBack={baggageBack}
                baggageThere={baggageThere}
                routeThere={routeThere}
                routeBack={routeBack}
                passengerIndex={passengerIndex}
                index={1}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PassengerCard;
