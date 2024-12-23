'use client'

import React, { useEffect } from "react";
import { useMxStateState } from "./context/mxState";
import { useWeather } from "./hooks/useWeather";
import TemperatureCard from "./ui/Cards/Temperature";
import NavBar from "./ui/NavBar";
import SearchSelect from "./ui/SearchSelect";
import Sidebar from "./ui/Sidebar";
import PollutionCard from "./ui/Cards/Pollution";
import PredictionCard from "./ui/Cards/Prediction";
import Loader from "./ui/Loader";

export default function Home() {
  const MxState = useMxStateState();

 const {
    getStateMX,
    getWeatherByCity, 
    getPollutionByCords, 
    getWeatherByCityForSomeDays,
    isLoadingWeatherByCityForSomeDays,
    isLoadingPollutionByCords,
    isLoadingWeatherByCity,
    listStatesMx,
    parseIConUrl,
    parseDataCityWeather, 
    parseDataPollutionByCords, 
    parseWeatherForSomeDays,
    firstDateWeather
  } = useWeather();

  useEffect(()=> {
    getStateMX()
  },[])

  useEffect(()=> {
    if(MxState.city.length){
      getWeatherByCity(MxState.city);
      getWeatherByCityForSomeDays(MxState.city);
    }
  }, [MxState.city])

  useEffect(()=>{
    if(MxState.coord){
      getPollutionByCords(MxState.coord.lon, MxState.coord.lat);
    }
  }, [MxState.coord])

  return (
    <div className="min-h-screenfont-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <Sidebar />
      <main className="flex flex-wrap flex-col items-center md:items-start p-4 gap-16 md:ml-64 sm:p-20 ">
        <div className="w-full flex flex-wrap  flex-col items-center justify-center ">
          <SearchSelect optionsStates={listStatesMx} />
          {
            isLoadingWeatherByCityForSomeDays || isLoadingPollutionByCords || isLoadingWeatherByCity ?
            <Loader />
            :
            <>
              <div className="flex flex-col lg:flex-row gap-4 mt-4">
                <TemperatureCard data={parseDataCityWeather} iconUrl={parseDataCityWeather.icon.length ? parseIConUrl(parseDataCityWeather.icon) : ''}/>
                <PollutionCard data={parseDataPollutionByCords} />
              </div>
              <PredictionCard 
                data={parseWeatherForSomeDays} 
                firstDate={firstDateWeather} 
                parseIConUrl={parseIConUrl}
              />
            </>
          }
        </div>
      </main>
    </div>
  );
}
