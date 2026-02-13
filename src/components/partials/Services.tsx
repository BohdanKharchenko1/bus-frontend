import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog.tsx';
import { Input } from '../ui/input.tsx';
import { sendInquiry } from '../../api/bus.ts';

const Services: React.FC = () => {
  const { t } = useTranslation('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const cards = t('services.cards', { returnObjects: true }) as {
    title: string;
    body: string;
  }[];

  const handleOpenModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setFormData({ name: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleFieldChange = (field: 'name' | 'email' | 'phone', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendInquiry(formData);
    setFormData({ name: '', email: '', phone: '' });
    setIsModalOpen(false);
  };

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

              <button
                type="button"
                onClick={() => handleOpenModal(card.title)}
                className="bg-[#F2D12E] hover:bg-[#E7C318] transition text-[#442C7A] font-semibold px-6 py-3 rounded-full"
              >
                {t('services.cta')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('services.modal.title')}</DialogTitle>
            <DialogDescription>
              {t('services.modal.description', { service: selectedService })}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="inquiry-name" className="text-sm font-medium">
                {t('services.modal.fields.name')}
              </label>
              <Input
                id="inquiry-name"
                value={formData.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
                placeholder={t('services.modal.placeholders.name')}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="inquiry-email" className="text-sm font-medium">
                {t('services.modal.fields.email')}
              </label>
              <Input
                id="inquiry-email"
                type="email"
                value={formData.email}
                onChange={(event) => handleFieldChange('email', event.target.value)}
                placeholder={t('services.modal.placeholders.email')}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="inquiry-phone" className="text-sm font-medium">
                {t('services.modal.fields.phone')}
              </label>
              <Input
                id="inquiry-phone"
                value={formData.phone}
                onChange={(event) => handleFieldChange('phone', event.target.value)}
                placeholder={t('services.modal.placeholders.phone')}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#442C7A] hover:bg-[#3a2469] transition text-white font-semibold px-6 py-3 rounded-full"
            >
              {t('services.modal.submit')}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
