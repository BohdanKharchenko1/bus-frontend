import { UseFormReturn } from 'react-hook-form';
import { Step3FormValues } from '@/components/booking/step3/schema/step3Schema.ts';
import { BaggageItem } from '@/types/routes.ts';

type AddBaggageProps = {
  form: UseFormReturn<Step3FormValues>;
  routeIndex: number;
  passengerIndex: number;
  baggageThere: BaggageItem[];
  baggageBack?: BaggageItem[];
};
export default function AddBaggage({
  form,
  passengerIndex,
  routeIndex,
  baggageThere,
  baggageBack,
}: AddBaggageProps) {
  const { getValues, setValue } = form;
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

  return (
    <>
      <button type="button" className=" w-10 h-10 bg-red-500" onClick={handleAddBaggage}>
        +
      </button>
      <button>-</button>
    </>
  );
}
