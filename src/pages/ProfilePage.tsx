import Navbar from '../components/partials/Navbar.tsx';
import LoginSignUpSwapper from '../components/profile/components/LoginSignUpSwapper.tsx';
import Footer from '../components/partials/Footer.tsx';
import { useUserStore } from '../stores/userStore.ts';
import Dashboard from '../components/profile/components/Dashboard.tsx';

export default function ProfilePage() {
  const userId = useUserStore((s) => s.id);
  return (
    <>
      <Navbar />
      <main className="flex justify-center px-4 py-8">
        {userId ? <Dashboard /> : <LoginSignUpSwapper />}
      </main>
      <Footer />
    </>
  );
}
