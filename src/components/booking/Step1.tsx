import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useBookingStore } from '../../stores/bookingStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslation } from 'react-i18next';
import { Step1Form } from './step1/components/Step1Form';
import { useStep1Form } from './step1/hooks/useStep1Form';
import { Step1FormValues } from '@/components/booking/step1/schema/step1Schema.ts';
import { useNavigate } from 'react-router';

type Step1Props = {
  onNext?: () => void;
  shouldRedirect?: boolean;
};

export default function Step1({ onNext, shouldRedirect }: Step1Props) {
  const { t } = useTranslation('step1');
  const navigate = useNavigate();
  const { from, to, startDate, endDate, passengerCount, currency, setStep1 } = useBookingStore(
    useShallow((state) => ({
      from: state.from,
      to: state.to,
      startDate: state.startDate,
      endDate: state.endDate,
      passengerCount: state.passengerCount,
      currency: state.currency,
      setStep1: state.setStep1,
    })),
  );

  const { form } = useStep1Form({
    from,
    to,
    startDate,
    endDate,
    passengerCount,
    currency,
  });

  const onSubmit = (data: Step1FormValues) => {
    const normalizedEndDate = data.endDate ?? '';
    const normalizedStartDate = data.startDate ?? '';

    const shouldReset =
      data.from !== from ||
      data.to !== to ||
      normalizedStartDate !== startDate ||
      normalizedEndDate !== endDate ||
      data.currency !== currency;

    if (shouldReset) useBookingStore.getState().reset();
    setStep1({
      ...data,
      startDate: normalizedStartDate,
      endDate: normalizedEndDate,
    });
    onNext?.();
    if (shouldRedirect) navigate('/buy_ticket');
  };

  return (
    <div className="max-w-7xl mx-auto pt-8 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{t('title')}</CardTitle>
        </CardHeader>

        <CardContent className="pt-4 px-4 md:px-6 overflow-visible h-max">
          <Step1Form form={form} onSubmit={onSubmit} showReturnDate={false} t={t} />
        </CardContent>
      </Card>
    </div>
  );
}
