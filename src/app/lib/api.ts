/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as Types from "@/types";

export const fetchMexicoStates = async (): Promise<Types.IResponseStateMx>  => {
  try {
    const response = await axios.get(
      'https://api.copomex.com/query/get_estados?token=acb4206d-6a8f-4b88-a057-1c26b3fe6eca'
    );
    return response.data;
  } catch (error: unknown) {
    console.error(error)
    throw new Error("Error al obtener los estados");
  }
};
export const fetchWeatherByCity = async (
  city: string
): Promise<Types.IResponseWeatherByCity> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_OPENWEATHER_API_BASE_URL}/weather`,
      {
        params: {
          q: city,
          units: "metric",
          lang: "es",
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Error al obtener los datos del clima");
  }
};


export const fetchAirPollutionByCords = async (
  lon: number ,lat: number
): Promise<Types.IResponseAirPollutionByCord> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_OPENWEATHER_API_BASE_URL}/air_pollution`,
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Error al obtener los datos de la contaminacion del aire ");
  }
};

export const fetchWeatherByCityForSomeDays = async (
  city: string
): Promise<Types.IResponseWeatherByCityForSomeDays> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_OPENWEATHER_API_BASE_URL}/forecast`,
      {
        params: {
          q: city,
          units: "metric",
          lang: "es",
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Error al obtener los datos del clima de los siguientes dias");
  }
};


