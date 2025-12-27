import React from "react";

const Services: React.FC = () => {
    return (
        <section className="bg-white py-35 px-6">
            <div className="max-w-7xl mx-auto text-left">
                <div className="mb-14">
          <span className="inline-block bg-[#442C7A] text-white text-3xl font-semibold py-4 px-12 rounded-full shadow-md">
            Частные услуги
          </span>
                </div>

                {/* Karty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Karta 1 */}
                    <div className="bg-[#442C7A] rounded-2xl p-10 shadow-lg text-left">
                        <h3 className="text-2xl font-semibold mb-6 text-white">
                            Организованные турпоездки
                        </h3>

                        <p className="text-base text-white leading-relaxed mb-8">
                            Маршруты под вашу группу и расписание. Мы предлагаем
                            комфортабельные автобусы и профессиональных водителей для туров по
                            Европе и Украине. Гибкое планирование маршрута, остановки по
                            желанию группы.
                        </p>

                        <button className="bg-[#F2D12E] hover:bg-[#E7C318] transition text-[#442C7A] font-semibold px-6 py-3 rounded-full">
                            Оставить заявку
                        </button>
                    </div>

                    {/* Karta 2 */}
                    <div className="bg-[#442C7A] rounded-2xl p-10 shadow-lg text-left">
                        <h3 className="text-2xl font-semibold mb-6 text-white">
                            Аренда автобуса
                        </h3>

                        <p className="text-base text-white leading-relaxed mb-8">
                            Трансферы, корпоративы, экскурсии и любые мероприятия.
                            Мы предоставляем современные комфортабельные автобусы и
                            микроавтобусы с профессиональными водителями. Гибкие условия
                            аренды — от нескольких часов до многодневных поездок.
                        </p>

                        <button className="bg-[#F2D12E] hover:bg-[#E7C318] transition text-[#442C7A]font-semibold px-6 py-3 rounded-full">
                            Оставить заявку
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
