const PromoSection = () => {
    return (
        <section
            className="
                bg-gradient-to-r from-purple-900 to-purple-700 text-white
                rounded-2xl
                max-w-7xl
                mx-auto
                mt-12
                my-20
                px-8
                py-10 sm:py-12
                flex flex-col md:flex-row
                items-center justify-between
                space-y-6 md:space-y-0
            "
        >
            <div>
                <h2 className="text-2xl font-semibold mb-2">
                    Готовы в путь?
                </h2>
                <p className="text-sm sm:text-base opacity-90">
                    Зарегистрируйтесь и получите первую поездку со скидкой в 10%
                </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    className="
                        bg-white text-purple-800 font-medium
                        px-6 py-3
                        rounded-lg
                        hover:bg-gray-100 transition
                    "
                >
                    Зарегистрироваться
                </button>
                <button
                    className="
                        border border-white text-white font-medium
                        px-6 py-3
                        rounded-lg
                        hover:bg-white hover:text-purple-800 transition
                    "
                >
                    Найти рейс
                </button>
            </div>
        </section>
    );
};

export default PromoSection;
