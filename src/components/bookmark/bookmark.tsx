import React from 'react';
import {OfferType} from '../../types/types';
import {useAppDispatch} from '../../hooks';
import {postFavorite} from '../../store/action';

type BookmarkProps = {
  id: OfferType['id'];
  isActive: boolean;
  place: 'place-card' | 'property';
}

const Bookmark = ({id, isActive, place}: BookmarkProps) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(postFavorite({id, status: isActive ? 0 : 1} ));
  };

  return(
    <button
      className={`${place}__bookmark-button ${isActive ? `${place}__bookmark-button--active` : ''} button`} type={'button'}
      onClick={handleButtonClick}
    >
      <svg
        className={`${place}__bookmark-icon`}
        width={`${place === 'place-card' ? 18 : 31}`}
        height={`${place === 'place-card' ? 19 : 33}`}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className={'visually-hidden'}>${place === 'place-card' ? 'In' : 'To'} bookmarks</span>
    </button>
  );
};

export default Bookmark;
