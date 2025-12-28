import React from 'react';
import headerBg from '../../assets/img/vo-trans-bus-Bhs1Pa4N.webp';
import logo from '../../assets/img/vo-trans-logo.svg';
import road from '../../assets/img/destination.svg';

const Header: React.FC = () => {
  return (
    <header
      className="
                relative text-white bg-cover bg-no-repeat overflow-hidden
                h-[clamp(760px,55vw,1100px)]
            "
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundPosition: 'center 80%',
      }}
    >
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
                    -translate-x-[clamp(24px,3vw,48px)]
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
                    bottom-[clamp(140px,12vw,220px)]
                "
      >
        <h2
          className="
                        font-bold leading-tight
                        text-[clamp(32px,3vw,56px)]
                    "
        >
          Международные <br />
          пассажирские перевозки
        </h2>

        <div
          className="
                        mt-4 space-y-2 font-semibold
                        text-[clamp(18px,1.6vw,28px)]
                    "
        >
          <p>+420 000 000 000</p>
          <p>+420 000 000 000</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
