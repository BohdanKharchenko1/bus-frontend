const Navbar = () => {
    return (
        <header className="w-full bg-white shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                <div className="text-xl font-bold text-purple-800">VO-TRANS</div>

                <nav className="flex space-x-6 text-sm font-medium text-black">
                    <a
                        href="#"
                        className="bg-purple-800 text-white px-4 py-1 rounded-full"
                    >
                        Главная
                    </a>
                    <a href="#" className="hover:text-purple-700">
                        Расписание
                    </a>
                    <a href="#" className="hover:text-purple-700">
                        Купить билет
                    </a>
                    <a href="#" className="hover:text-purple-700">
                        Профиль
                    </a>
                    <a href="#" className="hover:text-purple-700">
                        Контакты
                    </a>
                </nav>

                <div className="border border-black rounded-full px-4 py-1 text-sm">
                    <span className="cursor-pointer hover:text-purple-700">RU</span> |{" "}
                    <span className="cursor-pointer hover:text-purple-700">CZ</span> |{" "}
                    <span className="cursor-pointer hover:text-purple-700">UA</span> |{" "}
                    <span className="cursor-pointer hover:text-purple-700">EN</span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
