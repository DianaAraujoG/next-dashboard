//#region Request API

export interface IWeatherInfo {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface IResponseWeatherByCity {
    base: string;
    clouds: {all: number};
    cod: number;
    coord: {lon: number, lat:number};
    dt: number;
    id: number;
    main: {
        feels_like: number,
        grnd_level: number,
        humidity: number,
        pressure: number,
        sea_level: number,
        temp: number,
        temp_max: number,
        temp_min: number
    },
    name: string;
    sys: {type: number, id: number, country: string, sunrise: number, sunset: number};
    timezone: number;
    visibility: number;
    weather: IWeatherInfo[];
    wind: {speed: number, deg: number, gust: number}
}

export interface IListAirPollution {
    dt: number; 
    main: {
        aqi: number; 
    };
    components: {
        co: number; 
        nh3: number;
        no: number;
        no2: number; 
        o3: number; 
        pm2_5: number; 
        pm10: number;
        so2: number; 
    };
}

export interface IResponseAirPollutionByCord {
    coord: {
      lat: number; 
      lon: number; 
    };
    list: IListAirPollution[];
}

export interface IListWeatherDays {
    clouds: {
        all:number;
    };
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    };
    weather: IWeatherInfo[];
}

export interface IResponseWeatherByCityForSomeDays {
    city: {
      name: string;
      country: string;
    };
    list: IListWeatherDays[];
}
  
export interface IResponseStateMx {
    error: boolean,
    code_error: number,
    error_message: null,
    response: {
        estado: string[]
    }
}    

//#region MxState Context

export interface IStateCtxMxState {
    city: string;
    coord: IResponseWeatherByCity['coord'],
    error: string;
}

export enum EMxStateReducer {
  city = 'MXSTATE_CITY',
  coord = 'MXSTATE_COORD',
  update = 'MXSTATE_UPDATE',
  error = 'MXSTATE_ERROR'
}

export interface IMxStateReducerCity {
    type: EMxStateReducer.city
    payload: IStateCtxMxState ;
}

export interface IMxStateReducerCoord {
    type: EMxStateReducer.coord
    payload: IStateCtxMxState ;
}

export interface IMxStateReducerUpdate {
    type: EMxStateReducer.update
    payload: IStateCtxMxState ;
}

export interface IMxStateReducerError {
    type: EMxStateReducer.error
    payload: IStateCtxMxState ;
}

export type TMxStateActions =
  | IMxStateReducerCity
  | IMxStateReducerCoord
  | IMxStateReducerUpdate
  | IMxStateReducerError;


//#region useWeather

export interface IParseDataCityWeather {
    temp: IResponseWeatherByCity['main']['temp'];
    weather: IWeatherInfo['description'];
    icon: IWeatherInfo['icon'];
}

export interface IParseAirPollutionProps {
    aqi: IListAirPollution['main']['aqi'];
    components: {
        co: IListAirPollution['components']['co'];
        o3: IListAirPollution['components']['o3'];
        pm2_5: IListAirPollution['components']['pm2_5'];
        pm10: IListAirPollution['components']['pm10'];
    };
}

export type TParseWeatherForSomeDays = {
    [key: string]: IListWeatherDays[]
}

export type TListStates = IResponseStateMx['response']['estado']

export type TFirstDateWeather = string;

export type TLoader = boolean;