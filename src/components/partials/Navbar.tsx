import React, { useState } from 'react';
import { Link } from 'react-router';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('navbar');

  const handleClick = (lang: string): void => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div
        className="
          mx-auto
          max-w-[1400px]
          2xl:max-w-none
          flex items-center justify-between
          px-4 sm:px-6 lg:px-10 2xl:px-24
          py-3
        "
      >
        {/* LOGO */}
        <div className="text-xl lg:text-2xl font-bold text-purple-800">VO-TRANS</div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 2xl:space-x-10 text-sm lg:text-base font-medium text-black">
          <Link to="/" className="hover:text-purple-700">
            {t('home')}
          </Link>
          <Link to="/buy_ticket" className="hover:text-purple-700">
            {t('buyTicket')}
          </Link>
          <Link to="/profile" className="hover:text-purple-700">
            {t('profile')}
          </Link>
        </nav>

        {/* LANG + BURGER */}
        <div className="flex items-center space-x-4 2xl:space-x-6">
          {/* LANG SWITCH */}
          <div className="hidden sm:flex border border-black rounded-full px-4 py-1 text-sm">
            {['cs', 'ua', 'en'].map((l, i) => (
              <span key={l}>
                <span
                  onClick={() => handleClick(l)}
                  className="cursor-pointer hover:text-purple-700 uppercase"
                >
                  {l}
                </span>
                {i < 2 && ' | '}
              </span>
            ))}
          </div>

          {/* BURGER */}
          <button
            className="md:hidden flex flex-col justify-center space-y-1"
            onClick={() => setOpen(!open)}
          >
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col px-6 py-4 space-y-3 text-sm font-medium">
            <Link to="/" onClick={() => setOpen(false)}>
              {t('home')}
            </Link>
            <Link to="/buy_ticket" onClick={() => setOpen(false)}>
              {t('buyTicket')}
            </Link>
            <Link to="/profile" onClick={() => setOpen(false)}>
              {t('profile')}
            </Link>

            <div className="pt-3 border-t flex space-x-4">
              {['cs', 'ua', 'en'].map((l) => (
                <span
                  key={l}
                  onClick={() => handleClick(l)}
                  className="cursor-pointer hover:text-purple-700 uppercase"
                >
                  {l}
                </span>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
