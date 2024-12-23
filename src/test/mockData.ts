import * as Types from "@/types";

export const MOCK_OPTIONS: string[] = [
  "Ciudad de México",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Tijuana",
]
export const MOCK_FIRST_WEATHER: Types.TFirstDateWeather = "2024-12-23";

export const MOCK_INFO_WEATHER: Types.IWeatherInfo = {
    id: 802, 
    main: 'Clouds', 
    description: 'nubes dispersas', 
    icon: '03n'
}

export const MOCK_DATA_WEATHER: Types.IListWeatherDays = {
    clouds : {all: 35},
    dt : 1,
    dt_txt : "2024-12-23 12:00:00",
    main : {
        temp : 16.37,
        temp_max : 16.37,
        temp_min : 16.26,
    },
    weather : [MOCK_INFO_WEATHER],
}

export const MOCK_DATA_PREDICTION: Types.TParseWeatherForSomeDays = {
    "2024-12-23": [
        {
            ...MOCK_DATA_WEATHER, 
            dt : 1,
            dt_txt : "2024-12-23 10:00:00", 
            weather : [
                {
                    ...MOCK_INFO_WEATHER, 
                    description: 'cielo claro', 
                }
            ]
        },
        {
            ...MOCK_DATA_WEATHER, 
            dt : 2,
            dt_txt : "2024-12-23 15:00:00", 
            weather : [
                {
                    ...MOCK_INFO_WEATHER, 
                    description: 'nubes dispersas', 
                }
            ]
        },
        {
            ...MOCK_DATA_WEATHER, 
            dt : 3,
            dt_txt : "2024-12-23 20:00:00", 
            weather : [
                {
                    ...MOCK_INFO_WEATHER, 
                    description: 'nubes dispersas', 
                }
            ]
        },
    ],
    "2024-12-24": [
        {
            ...MOCK_DATA_WEATHER,
            dt : 4, 
            dt_txt : "2024-12-24 6:00:00", 
            weather : [
                {
                    ...MOCK_INFO_WEATHER, 
                    description: 'lluvia ligera', 
                }
            ]
        },
        {
            ...MOCK_DATA_WEATHER, 
            dt : 5,
            dt_txt : "2024-12-24 13:00:00", 
            weather : [
                {
                    ...MOCK_INFO_WEATHER, 
                    description: 'nubes dispersas', 
                }
            ]
        },
        {
            ...MOCK_DATA_WEATHER, 
            dt : 6,
            dt_txt : "2024-12-24 15:00:00", 
            weather : [
                {
                    ...MOCK_INFO_WEATHER, 
                    description: 'lluvia ligera', 
                }
            ]
        },
    ],
}

export const MOCK_DATA_CITY_WEATER: Types.IParseDataCityWeather = {
    temp: 23,
    weather: 'lluvia intensa',
    icon: ''
}

export const MOCK_DATA_POLLUTION: Types.IParseAirPollutionProps = {
    aqi: 5,
    components: {
        co: 8,
        o3: 2,
        pm2_5: 4,
        pm10: 6
    }
}