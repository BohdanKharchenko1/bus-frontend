import Navbar from '../components/partials/Navbar.tsx';
import LoginSignUpSwapper from '../components/profile/components/LoginSignUpSwapper.tsx';

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <LoginSignUpSwapper />
        </div>
      </main>
    </>
  );
}
