import { UseFormReturn } from 'react-hook-form';
import { Step3FormValues } from '../schema/step3Schema';
import { DiscountOption } from '../utils/price';

type SelectTicketProps = {
  form: UseFormReturn<Step3FormValues>;
  routeIndex: number;
  passengerIndex: number;
  options?: DiscountOption[];
};

const SelectTicket = ({ form, routeIndex, passengerIndex, options }: SelectTicketProps) => {
  return (
    <select
      {...form.register(`discounts.${routeIndex}.${passengerIndex}`, {
        valueAsNumber: true,
      })}
      className="w-full h-12 border border-slate-200 rounded-xl px-4 text-base bg-white text-slate-900 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all"
    >
      {options?.map((item) => (
        <option key={item.discount_id} value={item.discount_id}>
          {item.discount_name} — {item.discount_price} {item.currency}
        </option>
      ))}
    </select>
  );
};

export default SelectTicket;
