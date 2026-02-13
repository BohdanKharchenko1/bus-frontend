import Navbar from '../components/partials/Navbar.tsx';
import LoginSignUpSwapper from '../components/profile/components/LoginSignUpSwapper.tsx';
import Footer from '../components/partials/Footer.tsx';
import { useUserStore } from '../stores/userStore.ts';
import Dashboard from '../components/profile/components/Dashboard.tsx';
import AdminPage from '../components/profile/components/AdminPage.tsx';

export default function ProfilePage() {
  const userId = useUserStore((s) => s.id);
  const role = useUserStore((s) => s.role);

  let content;

  if (!userId) {
    content = <LoginSignUpSwapper />;
  } else if (role === 'admin') {
    content = <AdminPage />;
  } else {
    content = <Dashboard />;
  }

  return (
    <>
      <Navbar />
      <main className="flex justify-center px-4 py-8">{content}</main>
      <Footer />
    </>
  );
}
