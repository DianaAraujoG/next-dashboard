import React from "react";
import * as Types from "@/types";

interface IPollutionCardProps {
    data: Types.IParseAirPollutionProps;
}

const AQUI_LEVELS: string[] = [
    "Bueno",       // 1
    "Justo",       // 2
    "Moderado",    // 3
    "Pobre",       // 4
    "Muy pobre",   // 5
];


const PollutionCard = ({data}:IPollutionCardProps) => {
  return (
    <div className="flex flex-col items-center p-2 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">Calidad del aire</h2>
            <p className="text-lg font-medium">
                Índice de calidad del aire (AQI): <span className="text-blue-500">{AQUI_LEVELS[data.aqi - 1]}</span>
            </p>
        </div>
        <div className="mt-4">
            <ul className="text-sm">
            <li><span className="font-semibold" >Monóxido de carbono:</span> {data.components.co} μg/m³</li>
            <li><span className="font-semibold" >Ozono:</span> {data.components.o3} μg/m³</li>
            <li><span className="font-semibold" >Material particulado fino (PM2.5):</span> {data.components.pm2_5} μg/m³</li>
            <li><span className="font-semibold" >Material particulado grueso (PM10):</span> {data.components.pm10} μg/m³</li>
            </ul>
        </div>
    </div>
   
  );
};

export default PollutionCard;
