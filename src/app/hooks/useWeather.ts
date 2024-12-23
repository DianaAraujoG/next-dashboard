/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { fetchWeatherByCity, fetchAirPollutionByCords , fetchWeatherByCityForSomeDays, fetchMexicoStates} from "../lib/api";
// import { names } from "../config/names";
import { useMxStateDispatch, useMxStateState } from "../context/mxState";
import { names } from "../config/names";
import * as Types from "@/types";

interface IUseWeather {
    getStateMX(): Promise<void>;
    getWeatherByCity(city: string): Promise<void>;
    getWeatherByCityForSomeDays(city: string): Promise<void>;
    getPollutionByCords(lon: number ,lat: number):Promise<void>;
    parseIConUrl(icon: string): string;
    isLoadingWeatherByCity: Types.TLoader;
    isLoadingWeatherByCityForSomeDays: Types.TLoader;
    isLoadingPollutionByCords: Types.TLoader;
    listStatesMx: Types.TListStates;
    parseDataCityWeather: Types.IParseDataCityWeather;
    parseDataPollutionByCords: Types.IParseAirPollutionProps;
    parseWeatherForSomeDays: Types.TParseWeatherForSomeDays;
    firstDateWeather: Types.TFirstDateWeather;
}

const DEFAULT_CITY_WEATHER: Types.IParseDataCityWeather = {
    temp: 0,
    weather: '',
    icon: ''
}

const DEFAULT_AIR_POLLUTION: Types.IParseAirPollutionProps = {
    aqi:0,
    components: {
        co: 0,
        o3: 0,
        pm2_5: 0,
        pm10: 0
    }
}

const DEFAULT_SOME_DAYS: Types.TParseWeatherForSomeDays = {
    '': []
}

export const useWeather = (): IUseWeather => {
    const MxState = useMxStateState();
    const dispatch = useMxStateDispatch();

    const [listStatesMx, setListStatesMx] = useState<Types.TListStates>([]);
    const [parseDataCityWeather, setParseDataCityWeather] = useState<Types.IParseDataCityWeather>(DEFAULT_CITY_WEATHER);
    const [parseDataPollutionByCords, setParseDataPollutionByCords] = useState<Types.IParseAirPollutionProps>(DEFAULT_AIR_POLLUTION);
    const [parseWeatherForSomeDays, setParseWeatherForSomeDays] = useState<Types.TParseWeatherForSomeDays>(DEFAULT_SOME_DAYS);
    const [firstDateWeather, setFirstDateWeather ] = useState<Types.TFirstDateWeather>('');
    const [isLoadingWeatherByCity, setIsLoadingWeatherByCity] = useState<Types.TLoader>(false);
    const [isLoadingWeatherByCityForSomeDays, setIsLoadingWeatherByCityForSomeDays] = useState<Types.TLoader>(false);
    const [isLoadingPollutionByCords, setIsLoadingPollutionByCords] = useState<Types.TLoader>(false);

    const parseIConUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}.png`;

    const storeCoords= (payload: Types.IStateCtxMxState): void => {
        if (typeof window !== "undefined") {
            localStorage.setItem(
            names.storageKeys.MxStateInfo,
            JSON.stringify(payload)
            );
        }
        dispatch({
            type: Types.EMxStateReducer.city,
            payload
        });
    };

    const getStateMX = async (): Promise<void> => {
        if(!isLoadingWeatherByCity){
            setIsLoadingWeatherByCity(true)
        }
        try {
            const data: Types.IResponseStateMx = await fetchMexicoStates()
            if(data){
                setListStatesMx(data.response.estado)
            }

        } catch (error: unknown) {
        console.error(error)
        } finally {
            setIsLoadingWeatherByCity(false)
        }

    }

    const getWeatherByCity = async (city: string):Promise<void> => {
        if(!isLoadingWeatherByCity){
            setIsLoadingWeatherByCity(true)
        }
        try {
            const data: Types.IResponseWeatherByCity= await fetchWeatherByCity(city);
            if(data){
                const payload: Types.IStateCtxMxState =  {...MxState, coord: data.coord}
                storeCoords(payload);
                const parseData: Types.IParseDataCityWeather = {
                    temp: data.main.temp,
                    weather: data.weather[0].description || '',
                    icon: data.weather[0].icon
                }

                setParseDataCityWeather(parseData)
            }

        } catch (error: unknown) {
        console.error(error)
        } finally {
            setIsLoadingWeatherByCity(false)
        }
    };


    const getPollutionByCords = async (lon: number ,lat: number):Promise<void> => {
        if(!isLoadingWeatherByCity){
            setIsLoadingPollutionByCords(true)
        }
        try {
            const data: Types.IResponseAirPollutionByCord= await fetchAirPollutionByCords(lon, lat);
            if(data){
                const parseData: Types.IParseAirPollutionProps = {
                    aqi: data.list[0].main.aqi,
                    components: {
                        co: data.list[0].components.co,
                        o3: data.list[0].components.o3,
                        pm2_5: data.list[0].components.pm2_5,
                        pm10: data.list[0].components.pm10
                    }
                }

                setParseDataPollutionByCords(parseData)
            }

        } catch (error: unknown) {
            console.error(error)
        } finally {
            setIsLoadingPollutionByCords(false)
        }
    };

    const parseDataWeatherGrouped = (data: Types.IResponseWeatherByCityForSomeDays ): void => {
        const groupedByDay = data.list.reduce((acc: any, item: any) => {
            const date = item.dt_txt.split(" ")[0]; // Extraemos la fecha del dt_txt (YYYY-MM-DD)
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(item); // Agrupamos los datos bajo su fecha correspondiente
            return acc;
        }, {});
        
        const firstDate = Object.keys(groupedByDay)[0];

        setParseWeatherForSomeDays(groupedByDay);
        setFirstDateWeather(firstDate);
    }

    const getWeatherByCityForSomeDays = async (city: string):Promise<void> => {
        if(!isLoadingWeatherByCity){
            setIsLoadingWeatherByCityForSomeDays(true)
        }
        try {
            const data: Types.IResponseWeatherByCityForSomeDays = await fetchWeatherByCityForSomeDays(city);
            if(data){
                parseDataWeatherGrouped(data);
            }
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        } finally {
            setIsLoadingWeatherByCityForSomeDays(false)
        }
    };
  
    return {
        getStateMX,
        getWeatherByCity,
        getPollutionByCords,
        getWeatherByCityForSomeDays,
        isLoadingWeatherByCity,
        isLoadingWeatherByCityForSomeDays,
        isLoadingPollutionByCords,
        parseIConUrl,
        listStatesMx,
        parseDataCityWeather,
        parseDataPollutionByCords,
        parseWeatherForSomeDays,
        firstDateWeather
    }
}