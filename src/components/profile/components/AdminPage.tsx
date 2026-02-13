import { useTranslation } from 'react-i18next';
import { Step } from '../../../types/step.ts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.tsx';
import { Suspense, useState } from 'react';
import { Stepper } from '../../../components/partials/Stepper.tsx';
import Step1 from '../../../components/booking/Step1.tsx';
import Step2 from '../../../components/booking/Step2.tsx';
import AdminSeatsPlan from './AdminSeatsPlan.tsx';

export default function AdminPage() {
  const { t } = useTranslation('booking');
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((currentStep) => Math.min(currentStep + 1, 3));
  const previousStep = () => setStep((currentStep) => Math.max(currentStep - 1, 1));

  const steps: Step[] = [
    { id: 'route', label: t('steps.route') },
    { id: 'date', label: t('steps.date') },
    { id: 'seats', label: t('steps.seats') },
  ];
  const currentStepIndex = Math.max(step - 1, 0);

  return (
    <div className="max-w-7xl mx-auto flex flex-1 w-full flex-col justify-center p-1 sm:p-4 min-w-0">
      <Card className="w-full">
        <CardHeader className="px-0 sm:px-6">
          <CardTitle className="text-3xl">{t('adminTitle')}</CardTitle>
          <CardContent className="min-w-0 mt-1 sm:mt-12 px-0 gap-2">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Stepper
                steps={steps}
                current={currentStepIndex}
                onStepChange={(index) => setStep(Math.min(Math.max(index + 1, 1), 3))}
              />
              {step === 1 && <Step1 onNext={nextStep} />}
              {step === 2 && <Step2 onPrevious={previousStep} onNext={nextStep} />}
              {step === 3 && <AdminSeatsPlan onPrevious={previousStep} />}
            </Suspense>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
