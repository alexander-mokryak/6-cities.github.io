import React, {useCallback} from 'react';
import City from '../city/city';
import {cities} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCity} from '../../store/site-process/site-process';
import {CityName} from '../../types/types';
import {getCity} from '../../store/site-process/selectors';

export default function CitiesList ():JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCity);

  const handleCityClick = useCallback((name: CityName) => {
    dispatch(setCity(name));
  }, [dispatch]);

  return(
    <ul className={'locations__list tabs__list'}>
      {cities.map((city) => (
        <City key={city} name={city} isActive={city === activeCity.name} onClick={handleCityClick} />
      ))}
    </ul>
  );
}
