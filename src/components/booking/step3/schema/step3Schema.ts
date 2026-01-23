import { z } from 'zod';
import validator from 'validator';

export const createStep3Schema = (needOrderData: boolean) =>
  z
    .object({
      email: z.string().email('step3:errors.emailInvalid'),
      phone: z.string().refine((v) => validator.isMobilePhone(v, 'any', { strictMode: true }), {
        message: 'step3:errors.phoneInvalid',
      }),
      name: z.array(z.string().optional()),
      surname: z.array(z.string().optional()),
      discounts: z.array(z.array(z.number())),
      baggage: z.array(z.array(z.string())),
    })
    .superRefine((data, ctx) => {
      if (needOrderData) {
        data.name.forEach((name, i) => {
          if (!name || name.length < 2) {
            ctx.addIssue({
              code: 'custom',
              message: 'step3:errors.nameRequired',
              path: ['name', i],
            });
          }
          if (!name?.match(/^[A-Za-z]+$/)) {
            ctx.addIssue({
              code: 'custom',
              message: 'step3:errors.nameLatinOnly',
              path: ['name', i],
            });
          }
        });

        data.surname.forEach((surname, i) => {
          if (!surname || surname.length < 2) {
            ctx.addIssue({
              code: 'custom',
              message: 'step3:errors.surnameRequired',
              path: ['surname', i],
            });
          }
          if (!surname?.match(/^[A-Za-z]+$/)) {
            ctx.addIssue({
              code: 'custom',
              message: 'step3:errors.surnameLatinOnly',
              path: ['surname', i],
            });
          }
        });
      }
    });

export type Step3FormSchema = ReturnType<typeof createStep3Schema>;
export type Step3FormValues = z.infer<Step3FormSchema>;
