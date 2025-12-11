// src/components/SearchForm.jsx
import { useState } from 'react';

const SearchForm = () => {
  const [roundTrip, setRoundTrip] = useState(true);

  return (
    <section className="w-full flex justify-center mt-10">
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center space-y-4 w-full max-w-6xl">
        {/* Typ cesty */}
        <div className="flex space-x-6 text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              checked={!roundTrip}
              onChange={() => setRoundTrip(false)}
              className="form-radio text-purple-700"
            />
            <span>В одну сторону</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              checked={roundTrip}
              onChange={() => setRoundTrip(true)}
              className="form-radio text-purple-700"
            />
            <span>Туда и обратно</span>
          </label>
        </div>

        {/* Formulář */}
        <form className="flex flex-wrap justify-center items-end gap-4 w-full">
          {/* От */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">От</label>
            <select className="border border-purple-700 rounded-lg px-4 py-2 min-w-[160px] focus:outline-none">
              <option>Прага PRG</option>
              <option>Брно BRQ</option>
              <option>Острава OSR</option>
            </select>
          </div>

          {/* Куда */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Куда</label>
            <select className="border border-purple-700 rounded-lg px-4 py-2 min-w-[160px] focus:outline-none">
              <option>Будапешт BDT</option>
              <option>Вена VIE</option>
              <option>Братислава BTS</option>
            </select>
          </div>

          {/* Дата выезда */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Дата выезда</label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className="border border-purple-700 rounded-l-lg px-4 py-2 w-[140px] focus:outline-none"
            />
          </div>

          {/* Дата приезда */}
          {roundTrip && (
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Дата приезда</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                className="border border-purple-700 rounded-lg px-4 py-2 w-[140px] focus:outline-none"
              />
            </div>
          )}

          {/* Пассажиры */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Пассажиры</label>
            <select className="border border-purple-700 rounded-lg px-4 py-2 min-w-[140px] focus:outline-none">
              <option>1 Взрослый</option>
              <option>2 Взрослых</option>
              <option>1 Взрослый + 1 Ребёнок</option>
            </select>
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Найти рейс
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;
