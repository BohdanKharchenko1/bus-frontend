import React from 'react';
import { useTranslation } from 'react-i18next';
import headerBgMobile from '../../assets/img/img_1.png';
import headerBgDesktop from '../../assets/img/img_1.png';
import logo from '../../assets/img/vo-trans-logo.svg';
import road from '../../assets/img/destination.svg';

const Header: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <header
      className="
                relative text-white overflow-hidden
                h-[clamp(760px,55vw,1100px)]
            "
    >
      <img
        src={headerBgMobile}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-[68%] w-full object-cover object-[70%_90%] lg:hidden"
      />
      <img
        src={headerBgDesktop}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover object-[100%_100%] lg:block"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* LOGO */}
      <div className="absolute z-20 top-8 left-8">
        <img
          src={logo}
          alt="VO-TRANS logo"
          className="
                        w-auto object-contain drop-shadow-2xl
                        h-[clamp(140px,10vw,240px)]
                    "
        />
      </div>

      <div
        className="
                    absolute inset-0 z-10
                    hidden lg:flex items-center justify-center
                    translate-y-[clamp(90px,6vw,150px)]
                    translate-x-[clamp(24px,3vw,48px)]
                "
      >
        <img
          src={road}
          alt="VO-TRANS road"
          className="
                        w-auto opacity-90 object-contain drop-shadow-xl
                        max-h-[clamp(240px,20vw,380px)]
                    "
        />
      </div>

      <div
        className="
                    absolute z-20 text-left
                    left-8
                    bottom-[clamp(270px,12vw,220px)]
                "
      >
        <h2
          className="
                        font-bold leading-tight
                        text-[clamp(25px,3vw,56px)]
                    "
        >
          {t('header.titleLine1')} <br />
          {t('header.titleLine2')}
        </h2>

        <div
          className="
                        mt-4 space-y-2 font-semibold
                        text-[clamp(18px,1.6vw,28px)]
                    "
        >
          <p>{t('header.phones.ua')}</p>
          <p>{t('header.phones.cz')}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
