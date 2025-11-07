import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-white mt-16 pt-10 pb-6 border-t border-transparent overflow-hidden">
            {/* Dekorativní přerušovaná čára */}
            <div className="absolute top-0 left-0 w-full h-0.5 border-t-4 border-dashed border-purple-800"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 relative z-10">

                <div>
                    <h2 className="text-xl font-bold text-purple-800 mb-2">VO-TRANS</h2>
                    <p className="text-sm text-gray-700">
                        Международные автобусные перевозки.
                    </p>
                </div>


                <div>
                    <h3 className="text-purple-800 font-semibold mb-2">Навигация</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="#" className="hover:text-purple-700">
                                Бронирование
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-purple-700">
                                Личный кабинет
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-purple-700">
                                Контакты
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-purple-800 font-semibold mb-2">Поддержка</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="#" className="hover:text-purple-700">
                                Faq
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-purple-700">
                                Условия и возвраты
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-purple-700">
                                Политика конфиденциальности
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-purple-800 font-semibold mb-2">Связаться</h3>
                    <ul className="space-y-1 text-sm">
                        <li>+420 000 000 000</li>
                        <li>+420 000 000 000</li>
                        <li>+420 000 000 000</li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-8">
                © 2025 VO-TRANS. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
