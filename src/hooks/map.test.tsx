import {Map} from 'leaflet';
import {cities, CityLocation} from '../const';
import {render, renderHook, screen} from '@testing-library/react';
import useMap from './useMap';
import {City} from '../types/types';

const DummyComponent = () => <div data-testid={'dummy'}/>;

const city: City = {
  name: cities[0],
  location: CityLocation[cities[0]]
};

describe('Hook: useMap', () => {
  it('Should return map', () => {
    render(<DummyComponent />);

    const mapContainer = screen.getByTestId('dummy');
    expect(mapContainer).toBeEmptyDOMElement();

    const {result} = renderHook(() => useMap({current: mapContainer}, city));
    const map = result.current;

    expect(map).toBeInstanceOf(Map);
    expect(mapContainer).not.toBeEmptyDOMElement();
  });
});

/*
const ref = {
  current: document.createElement('div')
};
useMap(ref, city);
*/
