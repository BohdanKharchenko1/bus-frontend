import { cn } from '../../../lib/utils.ts';
import { Button } from '../../ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card.tsx';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../../ui/field.tsx';
import { Input } from '../../ui/input.tsx';
import React from 'react';
import { useLoginForm } from '../hooks/useAuthForm.ts';
import { LoginFormValues } from '../schema/authSchema.ts';
import { loginUser } from '../../../api/bus.ts';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { form } = useLoginForm();
  const { handleSubmit, register } = form;
  const sendLoginRequest = async (values: LoginFormValues) => {
    await loginUser(values);
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(sendLoginRequest)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required {...register('password')} />
              </Field>
              <Field>
                <Button type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
