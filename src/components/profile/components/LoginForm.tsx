import { startTransition } from 'react';
import { cn } from '../../../lib/utils.ts';
import { Button } from '../../ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card.tsx';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../../ui/field.tsx';
import { Input } from '../../ui/input.tsx';
import { useLoginForm } from '../hooks/useAuthForm.ts';
import { LoginFormValues } from '../schema/authSchema.ts';
import { loginUser } from '../../../api/bus.ts';
import { useUserStore } from '../../../stores/userStore.ts';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

interface LoginFormProps {
  setIsLogin: (value: boolean) => void;
}
export function LoginForm({ setIsLogin }: LoginFormProps) {
  const { form } = useLoginForm();
  const { handleSubmit, register } = form;
  const setUser = useUserStore((s) => s.setUser);
  const { t } = useTranslation('profile');
  const sendLoginRequest = async (values: LoginFormValues) => {
    const result = await loginUser(values);
    console.log(result);
    if (result.status === 200) {
      if (result.data.role === 'admin') {
        await i18n.loadNamespaces(['booking']);
      }
      startTransition(() => {
        setUser(result.data.id, result.data.email, result.data.role);
      });
    }
  };
  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.login.title')}</CardTitle>
          <CardDescription>{t('auth.login.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(sendLoginRequest)}>
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t('auth.fields.password')}</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t('auth.login.forgotPassword')}
                  </a>
                </div>
                <Input id="password" type="password" required {...register('password')} />
              </Field>
              <Field>
                <Button type="submit">{t('auth.login.submit')}</Button>

                <FieldDescription className="text-center">
                  {t('auth.login.noAccount')}{' '}
                  <button type={'button'} onClick={() => setIsLogin(false)}>
                    {t('auth.login.signUp')}
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
