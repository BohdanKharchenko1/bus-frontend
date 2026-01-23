import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import 'swiper/css/pagination';

const Reviews: React.FC = () => {
  const { t } = useTranslation('home');
  const reviews = t('reviews.items', { returnObjects: true }) as {
    text: string;
    author: string;
    route: string;
  }[];

  return (
    <section className="bg-[#442C7A] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="flex text-left mb-12">
          <span className="bg-yellow-400 text-[#442C7A] text-3xl font-semibold py-3 px-12 rounded-full shadow-md">
            {t('reviews.title')}
          </span>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              {/* CARD */}
              <div
                className="
                    bg-white rounded-xl shadow-md
                    p-5
                    flex flex-col
                    min-h-[190px]
                "
              >
                {/* STARS */}
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>

                {/* TEXT */}
                <p className="text-gray-700 text-sm mb-4">{item.text}</p>

                {/* AUTHOR */}
                <p className="text-gray-500 text-sm mt-auto">
                  {item.author}, {item.route}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
