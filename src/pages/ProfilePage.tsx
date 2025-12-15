import Navbar from '../components/partials/Navbar.tsx';
import { SignupForm } from '../components/profile/components/SignUpForm.tsx';
import { LoginForm } from '../components/profile/components/LoginForm.tsx';

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <LoginForm />
      <SignupForm />
    </>
  );
}
