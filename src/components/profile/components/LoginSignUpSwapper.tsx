import { useUserStore } from '../../../stores/userStore.ts';
import { LoginForm } from '../components/LoginForm.tsx';

export default function LoginSignUpSwapper() {
  const userId = useUserStore((s) => s.id);
  return userId ? <div>hello</div> : <LoginForm />;
}
