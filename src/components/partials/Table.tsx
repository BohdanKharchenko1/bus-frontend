import React from "react";

type Route = {
    route: string;
    date: string;
    dep: string;
    arr: string;
    duration: string;
    price: string;
    seats: "Есть" | "Нет" | "Мало";
    action: "Купить" | "Нет мест";
};

const Table: React.FC = () => {
    const routes: Route[] = [
        {
            route: "Киев ➜ Прага",
            date: "11.10.2025",
            dep: "7:00",
            arr: "12:00",
            duration: "5 ч.",
            price: "520 Kč",
            seats: "Есть",
            action: "Купить",
        },
        {
            route: "Прага ➜ Краков",
            date: "11.10.2025",
            dep: "7:00",
            arr: "12:00",
            duration: "5 ч.",
            price: "520 Kč",
            seats: "Нет",
            action: "Нет мест",
        },
        {
            route: "Киев ➜ Прага",
            date: "11.10.2025",
            dep: "7:00",
            arr: "12:00",
            duration: "5 ч.",
            price: "520 Kč",
            seats: "Мало",
            action: "Купить",
        },
    ];

    const getSeatColor = (status: Route["seats"]): string => {
        switch (status) {
            case "Есть":
                return "text-purple-700";
            case "Нет":
                return "text-gray-400";
            case "Мало":
                return "text-orange-500";
            default:
                return "";
        }
    };

    return (
        <section className="w-full flex flex-col items-center mt-10">
            <div className="overflow-x-auto w-full max-w-6xl">
                <table className="w-full bg-white shadow-md rounded-2xl border-collapse overflow-hidden">
                    <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                    <tr>
                        <th className="p-3">Маршрут</th>
                        <th className="p-3">Дата</th>
                        <th className="p-3">Отпр.</th>
                        <th className="p-3">Приб.</th>
                        <th className="p-3">В пути</th>
                        <th className="p-3">Цена</th>
                        <th className="p-3">Места</th>
                        <th className="p-3">Действие</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm divide-y">
                    {routes.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition">
                            <td className="p-3 font-semibold text-gray-800">
                                {item.route}
                            </td>
                            <td className="p-3">{item.date}</td>
                            <td className="p-3">{item.dep}</td>
                            <td className="p-3">{item.arr}</td>
                            <td className="p-3">{item.duration}</td>
                            <td className="p-3">{item.price}</td>
                            <td className={`p-3 font-medium ${getSeatColor(item.seats)}`}>
                                {item.seats}
                            </td>
                            <td className="p-3">
                                {item.action === "Нет мест" ? (
                                    <button className="bg-gray-200 text-gray-700 text-sm px-4 py-1 rounded-full cursor-default">
                                        Нет мест
                                    </button>
                                ) : (
                                    <button className="bg-purple-800 text-white text-sm px-4 py-1 rounded-full hover:bg-purple-700 transition">
                                        Купить
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <button className="mt-6 bg-purple-800 text-white font-medium px-8 py-2 rounded-xl hover:bg-purple-700 transition">
                Еще
            </button>
        </section>
    );
};

export default Table;
