const PromoSection = () => {
    return (
        <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-2xl max-w-6xl mx-auto mt-10 p-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Text vlevo */}
            <div>
                <h2 className="text-xl font-semibold mb-1">Готовы в путь?</h2>
                <p className="text-sm opacity-90">
                    Зарегистрируйтесь и получите первую поездку со скидкой в 10%
                </p>
            </div>

            <div className="flex space-x-3">
                <button className="bg-white text-purple-800 font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition">
                    Зарегистрироваться
                </button>
                <button className="border border-white text-white font-medium px-5 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition">
                    Найти рейс
                </button>
            </div>
        </section>
    );
};

export default PromoSection;
