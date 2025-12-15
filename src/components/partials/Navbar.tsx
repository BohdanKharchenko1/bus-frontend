import React from 'react';
import { useBookingStore } from '../../stores/bookingStore.ts';
import { Link } from 'react-router';

const Navbar: React.FC = () => {
  const setLang = useBookingStore((s) => s.setLang);

  const handleClick = (lang: string): void => {
    setLang(lang);
  };
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="text-xl font-bold text-purple-800">VO-TRANS</div>

        <nav className="flex space-x-6 text-sm font-medium text-black">
          <Link to="/" className="hover:text-purple-700">
            Главная
          </Link>
          <a href="#" className="hover:text-purple-700">
            Расписание
          </a>
          <Link to="/buy_ticket" className="hover:text-purple-700">
            Купить билет
          </Link>
          <Link to="/profile" className="hover:text-purple-700">
            Профиль
          </Link>

          <a href="#" className="hover:text-purple-700">
            Контакты
          </a>
        </nav>

        <div className="border border-black rounded-full px-4 py-1 text-sm">
          <span onClick={() => handleClick('ru')} className="cursor-pointer hover:text-purple-700">
            RU
          </span>{' '}
          |{' '}
          <span onClick={() => handleClick('cs')} className="cursor-pointer hover:text-purple-700">
            CZ
          </span>{' '}
          |{' '}
          <span onClick={() => handleClick('ua')} className="cursor-pointer hover:text-purple-700">
            UA
          </span>{' '}
          |{' '}
          <span onClick={() => handleClick('en')} className="cursor-pointer hover:text-purple-700">
            EN
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
