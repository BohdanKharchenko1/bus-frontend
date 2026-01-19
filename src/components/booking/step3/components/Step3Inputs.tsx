import { UseFormReturn } from 'react-hook-form';
import { TFunction } from 'i18next';
import { Step3FormValues } from '../schema/step3Schema';
import FormError from '../../../partials/FormError.tsx';

type Step3InputsProps = {
  form: UseFormReturn<Step3FormValues>;
  t: TFunction<'step3'>;
};

const inputClasses =
  'h-12 px-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all outline-none text-gray-800';

const Step3Inputs = ({ form, t }: Step3InputsProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-1">
        <input {...register('email')} placeholder={t('email')} className={inputClasses} />
        <FormError error={errors.email} />
      </div>

      <div className="flex flex-col gap-1">
        <input {...register('phone')} placeholder={t('phone')} className={inputClasses} />
        <FormError error={errors.phone} />
      </div>
    </div>
  );
};

export default Step3Inputs;
