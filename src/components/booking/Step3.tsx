import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { useStep3Form } from './step3/hooks/useStep3Form';
import { useDiscountsLoader } from './step3/hooks/useDiscountsLoader';
import { calculateTotalPrice } from './step3/utils/price';
import PassengerCard from './step3/components/PassengerCard';
import Step3Inputs from './step3/components/Step3Inputs';
import { Step3FormValues } from './step3/schema/step3Schema';

interface Step3Props {
  onPrevious?: () => void;
  onNext?: () => void;
}
export default function Step3({ onPrevious, onNext }: Step3Props) {
  const { t } = useTranslation('step3');

  const {
    passengerCount,
    needOrderData,
    routeBack,
    routeThere,
    saveBaggageAndDiscounts,
    discountsThere,
    discountsBack,
    discounts,
    saveStep3,
    name,
    surname,
    email,
    phone,
    baggageThere,
    baggageBack,
    needMiddleName,
    needBirthDate,
    baggage,
  } = useBookingStore(
    useShallow((state) => ({
      passengerCount: state.passengerCount,
      needOrderData: !!(state.routeThere?.need_orderdata || state.routeBack?.need_orderdata),
      needMiddleName: !!(state.routeThere?.need_middlename || state.routeBack?.need_middlename),
      needBirthDate: !!(state.routeThere?.need_birth || state.routeBack?.need_birth),
      routeThere: state.routeThere,
      routeBack: state.routeBack,
      saveBaggageAndDiscounts: state.saveBaggageAndDiscounts,
      discountsThere: state.discountsThere,
      discountsBack: state.discountsBack,
      saveStep3: state.saveStep3,
      discounts: state.discounts,
      name: state.name,
      surname: state.surname,
      email: state.email,
      phone: state.phone,
      baggageThere: state.baggageThere,
      baggageBack: state.baggageBack,
      baggage: state.baggage,
    })),
  );

  const { form } = useStep3Form({
    needOrderData,
    routeBack,
    discounts,
    name,
    surname,
    email,
    phone,
    needMiddleName,
    needBirthDate,
    baggage,
  });
  const { handleSubmit, watch } = form;
  const onSubmit = (data: Step3FormValues) => {
    console.log(data);
    saveStep3({
      discounts: data?.discounts,
      name: data?.name.map((v) => v || ''),
      surname: data?.surname.map((v) => v || ''),
      phone: data?.phone,
      email: data?.email,
      baggage: data?.baggage,
    });
    onNext?.();
  };

  useDiscountsLoader({
    form,
    passengerCount,
    routeThere,
    routeBack,
    saveBaggageAndDiscounts,
    discountsThere,
    discountsBack,
  });

  const allValues = watch();
  const totalPrice = useMemo(
    () =>
      calculateTotalPrice(allValues, {
        discountsThere,
        discountsBack,
        baggageThere,
        baggageBack,
        routeThere,
        routeBack,
      }),
    [allValues, discountsThere, discountsBack, baggageThere, baggageBack, routeThere, routeBack],
  );

  const totalCurrency = useMemo(() => {
    const candidates = [
      discountsThere?.discounts?.[0]?.currency,
      discountsBack?.discounts?.[0]?.currency,
      baggageThere?.[0]?.currency,
      baggageBack?.[0]?.currency,
    ];

    return candidates.find((c) => !!c) ?? '';
  }, [discountsBack, discountsThere, baggageBack, baggageThere]);

  return (
    <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center mb-3 sm:hidden">{t('title')}</CardTitle>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
              <button
                type="button"
                onClick={onPrevious}
                className="w-full sm:w-32 px-5 py-2 text-center rounded-lg bg-gray-200 text-gray-700 font-medium text-sm sm:text-base
               hover:bg-gray-300 active:scale-[0.97] transition-all"
              >
                ← {t('previous')}
              </button>
              <CardTitle className="hidden sm:block text-2xl md:text-3xl text-center">
                {t('title')}
              </CardTitle>

              <button
                type="submit"
                className="w-full sm:w-32 px-5 py-2 text-center rounded-lg bg-purple-700 text-white font-medium text-sm sm:text-base
               hover:bg-purple-800 active:scale-[0.97] transition-all"
              >
                {t('next')} →
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                    {t('total_price_label')}
                  </span>
                  <span className="text-xs text-slate-500">{t('total_price_hint')}</span>
                </div>
                <div className="flex items-baseline gap-2 text-slate-900">
                  <span className="text-2xl font-semibold">{totalPrice.toFixed(2)}</span>
                  {totalCurrency && (
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
                      {totalCurrency}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Step3Inputs form={form} t={t} />
          </CardHeader>
          <CardContent>
            {Array.from({ length: passengerCount }).map((_, i) => (
              <PassengerCard
                key={i}
                passengerIndex={i}
                form={form}
                discountsThere={discountsThere}
                discountsBack={discountsBack}
                routeThere={routeThere}
                routeBack={routeBack}
                t={t}
                baggageBack={baggageBack}
                baggageThere={baggageThere}
              />
            ))}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
