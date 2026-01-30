import { LoginForm } from './LoginForm.tsx';
import { useState } from 'react';
import { SignupForm } from './SignUpForm.tsx';

export default function LoginSignUpSwapper() {
  const [isLogin, setIsLogin] = useState<true | false>(true);
  return isLogin ? (
    <div className="w-full max-w-md">
      <LoginForm setIsLogin={setIsLogin} />{' '}
    </div>
  ) : (
    <div className="w-full max-w-md">
      <SignupForm setIsLogin={setIsLogin} />
    </div>
  );
}
