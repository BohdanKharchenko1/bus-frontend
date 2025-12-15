import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginFormValues,
  loginSchema,
  SighUpFormValues,
  signupSchema,
} from '../schema/authSchema.ts';

export const useSignUpForm = () => {
  const form = useForm<SighUpFormValues>({
    resolver: zodResolver(signupSchema),
  });

  return { form };
};
export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return { form };
};
