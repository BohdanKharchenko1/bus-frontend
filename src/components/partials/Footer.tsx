import React from 'react';
import { useTranslation } from 'react-i18next';
import line_1 from "../../assets/img/line-1.svg";
import line_2 from "../../assets/img/line-2.svg";
import line_3 from "../../assets/img/line-3.svg";

const Footer: React.FC = () => {
  const { t } = useTranslation('home');
  const navLinks = t('footer.navigation.links', { returnObjects: true }) as string[];
  const supportLinks = t('footer.support.links', { returnObjects: true }) as string[];
  const contactLines = t('footer.contact.lines', { returnObjects: true }) as string[];
  return (
      <footer className="relative bg-white w-full overflow-hidden pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        {/* LINE 3 */}
        <img
            src={line_3}
            alt=""
            className="absolute top-4 sm:top-6 left-0 w-full opacity-80 sm:opacity-100 pointer-events-none select-none"
        />

        {/* LINE 2 */}
        <img
            src={line_2}
            alt=""
            className="
          absolute top-2 left-0
          w-auto
          max-w-[520px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1050px]
          opacity-75
          pointer-events-none select-none
        "
        />

        {/* LINE 1 */}
        <img
            src={line_1}
            alt=""
            className="
          hidden sm:block
          absolute right-0
          top-[58%] -translate-y-1/2
          w-auto
          max-w-[120px] md:max-w-[150px] lg:max-w-[180px]
          opacity-75
          pointer-events-none select-none
        "
        />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div
              className="
            grid gap-8 sm:gap-10
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
          "
          >
            {/* Column 1 */}
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold text-purple-800 mb-2">
                {t('footer.brand')}
              </h2>
              <p className="text-sm text-gray-700 max-w-xs mx-auto sm:mx-0">
                {t('footer.description')}
              </p>
            </div>

            {/* Column 2 */}
            <div className="text-center sm:text-left">
              <h3 className="text-purple-800 font-semibold mb-3">{t('footer.navigation.title')}</h3>
              <ul className="space-y-2 text-sm">
                {navLinks.map((label) => (
                  <li key={label}>
                    <a href="#" className="hover:text-purple-700">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div className="text-center sm:text-left">
              <h3 className="text-purple-800 font-semibold mb-3">{t('footer.support.title')}</h3>
              <ul className="space-y-2 text-sm">
                {supportLinks.map((label) => (
                  <li key={label}>
                    <a href="#" className="hover:text-purple-700">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div className="text-center sm:text-left">
              <h3 className="text-purple-800 font-semibold mb-3">{t('footer.contact.title')}</h3>
              <ul className="space-y-2 text-sm">
                {contactLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="text-center text-xs text-gray-500 mt-10 sm:mt-12">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
  );
};

export default Footer;
