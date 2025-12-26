import React from "react";
import { Shield, PhoneCall, Gift, Info } from "lucide-react";

const About: React.FC = () => {
    return (
        <section className="bg-[#442C7A] py-20 px-6">
            <div className="max-w-7xl mx-auto text-left">

                {/* O NAS */}
                <div className="mb-16">
                    <span className="inline-block bg-yellow-400 text-[#442C7A] text-3xl font-semibold py-3 px-12 rounded-full shadow-md">
                        О нас
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white">

                    {/* 1 */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center">
                            <Shield className="text-yellow-400" size={32} />
                        </div>
                        <h3 className="font-semibold text-lg">
                            Надёжность и безопасность
                        </h3>
                        <p className="text-sm opacity-80">
                            Опытные водители, регулярный техосмотр, страхование пассажиров.
                        </p>
                    </div>

                    {/* 2 */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center">
                            <PhoneCall className="text-yellow-400" size={32} />
                        </div>
                        <h3 className="font-semibold text-lg">
                            Удобство на каждом шаге
                        </h3>
                        <p className="text-sm opacity-80">
                            Покупка за минуту, электронный билет, понятное расписание.
                        </p>
                    </div>

                    {/* 3 */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center">
                            <Gift className="text-yellow-400" size={32} />
                        </div>
                        <h3 className="font-semibold text-lg">
                            Скидки
                        </h3>
                        <p className="text-sm opacity-80">
                            Лояльность и промокоды — экономьте на регулярных поездках.
                        </p>
                    </div>

                    {/* 4 */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center">
                            <Info className="text-yellow-400" size={32} />
                        </div>
                        <h3 className="font-semibold text-lg">
                            Поддержка на каждом этапе
                        </h3>
                        <p className="text-sm opacity-80">
                            Поможем с бронированием, возвратами и вопросами по багажу.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
