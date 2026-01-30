import { cn } from '../../../lib/utils.ts';
import { Button } from '../../ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card.tsx';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../../ui/field.tsx';
import { Input } from '../../ui/input.tsx';
import { useSignUpForm } from '../hooks/useAuthForm.ts';
import { SighUpFormValues } from '../schema/authSchema.ts';
import { registerUser } from '../../../api/bus.ts';

interface LoginFormProps {
  setIsLogin: (value: boolean) => void;
}
export function SignupForm({ setIsLogin }: LoginFormProps) {
  const { form } = useSignUpForm();
  const { handleSubmit, watch, register } = form;
  const sendRegisterRequest = async (values: SighUpFormValues) => {
    await registerUser(values);
  };
  return (
    <div className={cn('flex flex-col gap-6 min-h-screen items-center justify-center')}>
      <Card className="max-w-xl w-full ">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(sendRegisterRequest)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName">First name</FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...register('firstName')}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...register('lastName')}
                />
              </Field>
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
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" required {...register('password')} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    {...register('confirmPassword')}
                  />
                </Field>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setIsLogin(true)}>
                    Sign in
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
      <pre className="text-xs">{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
}
