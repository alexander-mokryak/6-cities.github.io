import React, {useState} from 'react';
import {Sorting} from '../../const';
import {SortName} from '../../types/types';

interface SortingListProps {
  onChange: (name: SortName) => void;
  activeSorting: SortName;
}

const SortingList = ({onChange, activeSorting}: SortingListProps): JSX.Element => {
  const [isSortPopupShown, setShowSortPopup] = useState<boolean>(false);

  function handleToggleButtonClick () {
    setShowSortPopup(!isSortPopupShown);
  }

  function handleSortItemClick (name: SortName) {
    setShowSortPopup(false);
    onChange(name);
  }

  return(
    <form className={'places__sorting'} action={'#'} method={'get'}>
      <span className={'places__sorting-caption'}>Sort by </span>
      <span className={'places__sorting-type'} tabIndex={0} onClick={handleToggleButtonClick}>
        {Sorting[activeSorting]}
        <svg className={'places__sorting-arrow'} width={'7'} height={'4'}>
          <use xlinkHref={'#icon-arrow-select'}></use>
        </svg>
      </span>
      {isSortPopupShown && (
        <ul className={'places__options places__options--custom places__options--opened'}>
          {(Object.entries(Sorting) as [SortName, Sorting][]).map(([name, title]) => (
            <li
              key={name}
              className={`places__option${name === activeSorting ? ' places__option--active' : ''}`}
              onClick={() => handleSortItemClick(name)}
              tabIndex={0}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SortingList;
