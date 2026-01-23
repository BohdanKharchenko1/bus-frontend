import React from 'react';
import { useTranslation } from 'react-i18next';

const Services: React.FC = () => {
  const { t } = useTranslation('home');
  const cards = t('services.cards', { returnObjects: true }) as {
    title: string;
    body: string;
  }[];
  return (
    <section className="bg-white py-35 px-6">
      <div className="max-w-7xl mx-auto text-left">
        <div className="mb-14">
          <span className="inline-block bg-[#442C7A] text-white text-3xl font-semibold py-4 px-12 rounded-full shadow-md">
            {t('services.title')}
          </span>
        </div>

        {/* Karty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cards.map((card, index) => (
            <div key={index} className="bg-[#442C7A] rounded-2xl p-10 shadow-lg text-left">
              <h3 className="text-2xl font-semibold mb-6 text-white">{card.title}</h3>

              <p className="text-base text-white leading-relaxed mb-8">{card.body}</p>

              <button className="bg-[#F2D12E] hover:bg-[#E7C318] transition text-[#442C7A] font-semibold px-6 py-3 rounded-full">
                {t('services.cta')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
