import { cn } from '../../../lib/utils.ts';
import { Button } from '../../ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card.tsx';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../../ui/field.tsx';
import { Input } from '../../ui/input.tsx';
import { useSignUpForm } from '../hooks/useAuthForm.ts';
import { SighUpFormValues } from '../schema/authSchema.ts';
import { registerUser } from '../../../api/bus.ts';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  setIsLogin: (value: boolean) => void;
}
export function SignupForm({ setIsLogin }: LoginFormProps) {
  const { form } = useSignUpForm();
  const { handleSubmit, register } = form;
  const { t } = useTranslation('profile');
  const sendRegisterRequest = async (values: SighUpFormValues) => {
    await registerUser(values);
  };
  return (
    <div className={cn('flex flex-col gap-6 min-h-screen items-center justify-center')}>
      <Card className="max-w-xl w-full ">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('auth.signup.title')}</CardTitle>
          <CardDescription>{t('auth.signup.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(sendRegisterRequest)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName">{t('auth.fields.firstName')}</FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder={t('auth.placeholders.firstName')}
                  required
                  {...register('firstName')}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">{t('auth.fields.lastName')}</FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder={t('auth.placeholders.lastName')}
                  required
                  {...register('lastName')}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">{t('auth.fields.email')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.placeholders.email')}
                  required
                  {...register('email')}
                />
              </Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="password">{t('auth.fields.password')}</FieldLabel>
                  <Input id="password" type="password" required {...register('password')} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    {t('auth.fields.confirmPassword')}
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    {...register('confirmPassword')}
                  />
                </Field>
                <FieldDescription>{t('auth.signup.passwordHint')}</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">{t('auth.signup.submit')}</Button>
                <FieldDescription className="text-center">
                  {t('auth.signup.haveAccount')}{' '}
                  <button type="button" onClick={() => setIsLogin(true)}>
                    {t('auth.signup.signIn')}
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t('auth.signup.agreePrefix')}{' '}
        <a href="#">{t('auth.signup.termsOfService')}</a> {t('auth.signup.agreeAnd')}{' '}
        <a href="#">{t('auth.signup.privacyPolicy')}</a>
        {t('auth.signup.agreeSuffix')}
      </FieldDescription>
    </div>
  );
}
