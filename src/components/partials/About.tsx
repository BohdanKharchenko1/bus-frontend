import React from 'react';
import { Shield, PhoneCall, Gift, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation('home');
  const items = t('about.items', { returnObjects: true }) as {
    title: string;
    body: string;
  }[];
  const icons = [Shield, PhoneCall, Gift, Info];

  return (
    <section className="bg-[#442C7A] py-20 px-6">
      <div className="max-w-7xl mx-auto text-left">
        {/* O NAS */}
        <div className="mb-16">
          <span className="inline-block bg-yellow-400 text-[#442C7A] text-3xl font-semibold py-3 px-12 rounded-full shadow-md">
            {t('about.title')}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center">
                  <Icon className="text-yellow-400" size={32} />
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm opacity-80">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
