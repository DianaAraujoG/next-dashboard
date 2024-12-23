'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as Types from "@/types";
import { WEATHER_DESCRIPTIONS } from "@/app/constants";

export interface IPredictionCardProps {
  data: Types.TParseWeatherForSomeDays;
  firstDate: Types.TFirstDateWeather;
  parseIConUrl(icon: string): string;
}

type THorary = 'all' | 'am' | 'pm';

interface ISelectHorary {
  value: THorary;
  text: string;
  
}

const SELECT_HORARY: ISelectHorary[] = [
  {
    value: 'all',
    text: 'Todo el día'
  },
  {
    value: 'am',
    text: 'AM'
  },
  {
    value: 'pm',
    text: 'PM'
  },
]

const PredictionCard = ({ data, firstDate, parseIConUrl }: IPredictionCardProps) => {
  const [filteredData, setFilteredData] = useState<Types.IListWeatherDays[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [horary, setHorary]  = useState<THorary>('all');
  const [typeWeather, setTypeWeather]  = useState<string>('');

  useEffect(()=> {
    setSelectedDate(firstDate);
    setFilteredData(data[firstDate] || []);
  },[firstDate, data]);


  useEffect(()=>{
    const validateFiltered = handleFilteredData(horary, typeWeather);
    setFilteredData(validateFiltered);
  }, [selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleHoraryChange = (value: THorary) => {
    setHorary(value);
    const updateData = handleFilteredData(value, typeWeather);
    
    setFilteredData(updateData);
  };

  const handleTypeWeatherChange = (value: string) => {
    setTypeWeather(value);
    const updateData = handleFilteredData(horary, value);
    setFilteredData(updateData);
  };

  const filterByHorary = (dataToFilter: Types.IListWeatherDays[], horaryToFilter: THorary): Types.IListWeatherDays[] => (
    dataToFilter.filter((item)=> dayjs(item.dt_txt).format("h:mm A").toLocaleLowerCase().includes(horaryToFilter))
  )

  const filterByTypeWeather = (dataToFilter: Types.IListWeatherDays[], weather: string): Types.IListWeatherDays[] => (
    dataToFilter.filter((item)=> item.weather[0].description.toLocaleLowerCase() === (weather))
  )

  const handleFilteredData = (horaryToFilter: THorary, weather: string ): Types.IListWeatherDays[] => {
    const filterHorary = horaryToFilter !== 'all'? filterByHorary(data[selectedDate], horaryToFilter): data[selectedDate];
    const filterWeather = weather.length && weather !== 'todos' ? filterByTypeWeather(filterHorary,weather) : filterHorary;

    return filterWeather;
  }

  const weatherSelectDate = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredData.map((item: any) => (
        <div
          key={item.dt}
          className="card-weather bg-white rounded-lg p-3 shadow flex items-center dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            src={parseIConUrl(item.weather[0].icon)}
            alt={item.weather[0].description}
            className="w-12 h-12 mr-3"
          />
          <div>
            <p className="text-sm font-medium">{dayjs(item.dt_txt).format("h:mm A")}</p>
            <p className="text-sm">
              {item.main.temp}°C - {item.weather[0].description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-full p-6"  data-testid='prediction-card-component'>
      <h2 className="text-xl font-bold mb-4">
        Pronóstico del tiempo
      </h2>
      
      <div className="flex flex-wrap  gap-4 mb-4">
        <div >
          <label htmlFor="date-select" className="block text-sm font-medium ">
            Seleccione una fecha:
          </label>
          <select
            id="date-select"
            className="mt-2 p-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una fecha
            </option>
            {Object.keys(data).map((date) => (
              <option key={date} value={date}>
                {dayjs(date).format("D/M/YYYY")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="horary-select" className="block text-sm font-medium ">
            Horario:
          </label>
          <select
            id="horary-select"
            className="mt-2 p-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            value={horary}
            onChange={(e) => handleHoraryChange(e.target.value as THorary)}
          >
            <option value="" disabled>
              Selecciona un horario
            </option>
            {SELECT_HORARY.map(({value, text}) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type-weather-select" className="block text-sm font-medium ">
            Tipo de Clima:
          </label>
          <select
            id="type-weather-select"
            className="mt-2 p-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            value={typeWeather}
            onChange={(e) => handleTypeWeatherChange(e.target.value)}
          >
            <option value="" disabled>
              Selecciona un tipo de clima
            </option>
            {WEATHER_DESCRIPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-lg p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h3 className="font-bold mb-3">{dayjs(selectedDate).format("D/M/YYYY")}</h3>
        {selectedDate && (Array.isArray(filteredData) && !!filteredData.length ) && weatherSelectDate()}
        {Array.isArray(filteredData) && !filteredData.length && <p className="text-center text-lg">No se encontraron resultados para esa busqueda</p>}
      </div>
    </div>
  );
};

export default PredictionCard;

