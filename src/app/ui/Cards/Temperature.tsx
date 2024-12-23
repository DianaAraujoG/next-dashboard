/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as Types from "@/types";

interface ITemperatureCardProps {
  data: Types.IParseDataCityWeather;
  iconUrl: string;
}

const TemperatureCard = ({data, iconUrl}: ITemperatureCardProps) => (
  <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    {!!iconUrl.length && <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={iconUrl}
        alt="Ícono del clima"
      />
    }
    <div className="flex flex-col justify-between p-4 leading-normal">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Temperatura: {data.temp}°C</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Clima: {data.weather}</p>
    </div>
  </div>
  
);

export default TemperatureCard;
