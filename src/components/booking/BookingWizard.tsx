import { CardHeader, CardTitle, Card, CardContent } from '../ui/card.tsx';
import { useBookingStore } from '../../stores/bookingStore.ts';
import { Step } from '../../types/step.ts';
import { Stepper } from '../partials/Stepper.tsx';
import Step1 from '../booking/Step1.tsx';
import Step2 from '../booking/Step2.tsx';
import { useShallow } from 'zustand/react/shallow';
import { Suspense } from 'react';
import Step3 from '../booking/Step3.tsx';
import Step4 from '../booking/Step4.tsx';
import Step5 from '../booking/Step5.tsx';
import { useTranslation } from 'react-i18next';

export default function BookingWizard() {
  const { t } = useTranslation('booking');
  const { step, nextStep, previousStep } = useBookingStore(
    useShallow((state) => ({
      step: state.step,
      nextStep: state.nextStep,
      previousStep: state.previousStep,
    })),
  );
  const steps: Step[] = [
    { id: 'route', label: t('steps.route') },
    { id: 'date', label: t('steps.date') },
    { id: 'passengers', label: t('steps.passengers') },
    { id: 'seats', label: t('steps.seats') },
    { id: 'payment', label: t('steps.payment') },
  ];
  const currentStepIndex = Math.max(step - 1, 0);

  return (
    <div className="max-w-7xl mx-auto flex flex-1 w-full flex-col justify-center p-1 sm:p-4 min-w-0">
      <Card className="w-full">
        <CardHeader className="px-0 sm:px-6">
          <CardTitle className="text-3xl">{t('title')}</CardTitle>
          <CardContent className="min-w-0 mt-1 sm:mt-12 px-0">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Stepper steps={steps} current={currentStepIndex} />
              {step === 1 && <Step1 onNext={nextStep} />}
              {step === 2 && <Step2 onPrevious={previousStep} onNext={nextStep} />}
              {step === 3 && <Step3 onPrevious={previousStep} onNext={nextStep} />}
              {step === 4 && <Step4 onPrevious={previousStep} onNext={nextStep} />}
              {step === 5 && <Step5 onPrevious={previousStep} />}
            </Suspense>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
