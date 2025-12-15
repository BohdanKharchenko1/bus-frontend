import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password doesnt match',
    path: ['confirmPassword'],
  });

export type SighUpFormValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
