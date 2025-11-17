import { CardHeader, CardTitle, Card, CardDescription, CardContent } from '../ui/card.tsx';
import { useBookingStore } from '../../stores/bookingStore.ts';
import { Step } from '../../types/step.ts';
import { Stepper } from '../partials/Stepper.tsx';
import Step1 from '../booking/Step1.tsx';
import Step2 from '../booking/Step2.tsx';
import { useShallow } from 'zustand/react/shallow';
import { Suspense } from 'react';
import Step3 from '../booking/Step3.tsx';
import Step4 from '../booking/Step4.tsx';

export default function BookingWizard() {
  const { step, nextStep, previousStep } = useBookingStore(
    useShallow((state) => ({
      step: state.step,
      nextStep: state.nextStep,
      previousStep: state.previousStep,
    })),
  );
  const steps: Step[] = [
    { id: 'route', label: 'Маршрут' },
    { id: 'date', label: 'Дата и рейс' },
    { id: 'passengers', label: 'Пассажиры' },
    { id: 'seats', label: 'Места' },
    { id: 'payment', label: 'Оплата' },
  ];
  const currentStepIndex = Math.max(step - 1, 0);

  return (
    <div className="max-w-7xl mx-auto flex flex-1 w-full flex-col justify-center p-4 min-w-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Купить Билет</CardTitle>
          <CardDescription className="font-light text-md">
            Пять шагов, без формы «Откуда/Куда» - только существующие маршруты
            {step}
          </CardDescription>
          <CardContent className="min-w-0 mt-12 px-0">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Stepper steps={steps} current={currentStepIndex} />
              {step === 1 && <Step1 onNext={nextStep} />}
              {step === 2 && <Step2 onPrevious={previousStep} onNext={nextStep} />}
              {step === 4 && <Step3 onPrevious={previousStep} onNext={nextStep} />}
              {step === 3 && <Step4 onPrevious={previousStep} onNext={nextStep} />}
            </Suspense>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
