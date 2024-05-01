import React, {memo} from 'react';
import {CityName} from '../../types/types';

interface CityProps {
  name: CityName;
  isActive: boolean;
  onClick: (name: CityName) => void;
}

const City = ({name, isActive, onClick}: CityProps) => {
  const handleCityClick = () => {
    onClick(name);
  };

  return(
    <li className={'locations__item'} onClick={handleCityClick}>
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href={'#'}>
        <span>{name}</span>
      </a>
    </li>
  );
};

export default memo(City);
