import { z } from 'zod';
import { Point } from '../../../partials/SearchableInput';

export const step1Schema = z.object({
  from: z.custom<Point>(),
  to: z.custom<Point>(),
  startDate: z.string().refine(
    (val) => {
      if (!val) return;
      const selectedDate = new Date(val);
      const today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    { error: 'validation.startDate.startDateCantLowerThanToday' },
  ),
  endDate: z
    .string()
    .nullish()
    .refine(
      (val) => {
        if (!val) return true;
        const selectedDate = new Date(val);
        const today = new Date();
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { error: 'validation.endDate.endDateCantLowerThanToday' },
    ),
  passengerCount: z.number().optional(),
});

export type Step1FormSchema = typeof step1Schema;
export type Step1FormValues = z.infer<typeof step1Schema>;
