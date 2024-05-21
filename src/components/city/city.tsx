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
    <li className={'locations__item'}>
      <div className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} onClick={handleCityClick} role={'button'}>
        <span>{name}</span>
      </div>
    </li>
  );
};

export default memo(City);
