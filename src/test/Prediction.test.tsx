import React from 'react';
import {
    screen,
    render,
    cleanup,
    fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import PredictionCard, { IPredictionCardProps } from '@/app/ui/Cards/Prediction';
import { MOCK_DATA_PREDICTION , MOCK_FIRST_WEATHER} from './mockData';

const PROPS_COMPONENT: IPredictionCardProps = {
  data: MOCK_DATA_PREDICTION,
  firstDate: MOCK_FIRST_WEATHER,
  parseIConUrl: jest.fn()
};

describe('Testing "PredictionCard" component', () => {
  afterEach(cleanup);

  test('Show component in document', async () => {
    const { container } = render(<PredictionCard {...PROPS_COMPONENT} />);
    expect(container).toBeInTheDocument();
  });

  test('Should select a date ', () => {
    render(<PredictionCard {...PROPS_COMPONENT} />);
    const mainElement = screen.getByTestId('prediction-card-component');
    const elementDateSelect = mainElement.querySelector('[id="date-select"]');
    if(elementDateSelect){
        const datesData = Object.keys(MOCK_DATA_PREDICTION);
        fireEvent.change(elementDateSelect, { target: { value: datesData[datesData.length - 1] } });
        expect(elementDateSelect).toHaveValue(datesData[datesData.length - 1]);
    }
  });

  test('Should select a date and find the text in the component', () => {
    const { container } = render(<PredictionCard {...PROPS_COMPONENT} />);
    const mainElement = screen.getByTestId('prediction-card-component');
    const elementHorarySelect = mainElement.querySelector('[id="horary-select"]');
    if(elementHorarySelect){
        fireEvent.change(elementHorarySelect, { target: { value: 'am' } });
        expect(elementHorarySelect).toHaveValue('am');
        // debe hacer solo una carta porque es la unica con horario am
        expect(container.getElementsByClassName('card-weather')).toHaveLength(1);
    }
  });

  test('Should select a type of weather and only that type of weather should appear and not another', () => {
    render(<PredictionCard {...PROPS_COMPONENT} />);
 
    const mainElement = screen.getByTestId('prediction-card-component');
    const elementTypeWeatherSelect = mainElement.querySelector('[id="type-weather-select"]');
    if(elementTypeWeatherSelect){
        fireEvent.change(elementTypeWeatherSelect, { target: { value: 'nubes dispersas' } });
        expect(elementTypeWeatherSelect).toHaveValue('nubes dispersas');
        const icons = mainElement.querySelectorAll('[alt="nubes dispersas"]');
        //Comprobare que solo hay 2 cartas con este clima ya que en la primera fecha de deafault son los que hay de ese tipo de clima
        expect(icons).toHaveLength(2);

    }
  });

  test(' The 3 filters must coexist', () => {
    render(<PredictionCard {...PROPS_COMPONENT} />);
 
    const mainElement = screen.getByTestId('prediction-card-component');
    const elementDateSelect = mainElement.querySelector('[id="date-select"]');
    const elementHorarySelect = mainElement.querySelector('[id="horary-select"]');
    const elementTypeWeatherSelect = mainElement.querySelector('[id="type-weather-select"]');
    if(elementDateSelect){
        const datesData = Object.keys(MOCK_DATA_PREDICTION);
        fireEvent.change(elementDateSelect, { target: { value: datesData[datesData.length - 1] } });
    }
    if(elementHorarySelect){
        fireEvent.change(elementHorarySelect, { target: { value: 'pm' } });
        expect(elementHorarySelect).toHaveValue('pm');
    }
    if(elementTypeWeatherSelect){
        fireEvent.change(elementTypeWeatherSelect, { target: { value: 'lluvia ligera' } });
        const icons = mainElement.querySelectorAll('[alt="lluvia ligera"]');
        //Comprobare que solo hay 1 cartas con este clima, en esta fecha y en este horario 
        expect(icons).toHaveLength(1);

    }
  });
});
