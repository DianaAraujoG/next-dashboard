import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { MOCK_FIRST_WEATHER, MOCK_DATA_PREDICTION , MOCK_DATA_CITY_WEATER, MOCK_DATA_POLLUTION, MOCK_OPTIONS} from './mockData';
import NavBar from '@/app/ui/NavBar';
import Sidebar from '@/app/ui/Sidebar';
import SearchSelect from '@/app/ui/SearchSelect';
import TemperatureCard from '@/app/ui/Cards/Temperature';
import PollutionCard from '@/app/ui/Cards/Pollution';
import PredictionCard from '@/app/ui/Cards/Prediction';


jest.mock('../app/hooks/useWeather', () => ({
    useWeather: () => ({
        getStateMX: jest.fn(),
        getWeatherByCity: jest.fn(),
        getPollutionByCords: jest.fn(),
        getWeatherByCityForSomeDays: jest.fn(),
        isLoadingWeatherByCityForSomeDays: false ,
        isLoadingPollutionByCords: false,
        isLoadingWeatherByCity: false,
        listStatesMx: MOCK_OPTIONS, 
        parseIConUrl: jest.fn(),
        parseDataCityWeather: MOCK_DATA_CITY_WEATER, 
        parseDataPollutionByCords: MOCK_DATA_POLLUTION, 
        parseWeatherForSomeDays: MOCK_DATA_PREDICTION,
        firstDateWeather: MOCK_FIRST_WEATHER
    })
}));

describe('Testing "Dashboard" components', () => {
    afterEach(cleanup);

    test('Show component in document', async () => {
        const { container } = render(<Home />);
        expect(container).toBeInTheDocument();
    });
    
    // voy a probar si se renderizan los componentes que constituyen el dasboard

    test('Show NavBar component in document', async () => {
        const { container } = render(<NavBar />);
        expect(container).toBeInTheDocument();
    });

    test('Show Sidebar component in document', async () => {
        const { container } = render(<Sidebar />);
        expect(container).toBeInTheDocument();
    });

    test('Show SearchSelect component in document', async () => {
      const { container } = render(<SearchSelect optionsStates={MOCK_OPTIONS}/>);
      expect(container).toBeInTheDocument();
    });

    test('Show TemperatureCard component in document', async () => {
      const { container } = render(<TemperatureCard data={MOCK_DATA_CITY_WEATER} iconUrl='url/mock'/>);
      expect(container).toBeInTheDocument();
    });

    test('Show PollutionCard component in document', async () => {
      const { container } = render(<PollutionCard data={MOCK_DATA_POLLUTION}/>);
      expect(container).toBeInTheDocument();
    });

    test('Show PredictionCard component in document', async () => {
      const { container } = render(
      <PredictionCard 
        data= {MOCK_DATA_PREDICTION}
        firstDate= {MOCK_FIRST_WEATHER}
        parseIConUrl= {jest.fn()}
       />);
      expect(container).toBeInTheDocument();
    });
  
  
    
});
