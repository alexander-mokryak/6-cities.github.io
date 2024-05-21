import React from 'react';
import {OfferType} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {postFavorite} from '../../store/action';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AuthorizationStatus} from '../../const';

type BookmarkProps = {
  id: OfferType['id'];
  isActive: boolean;
  place: 'place-card' | 'property';
}

const Bookmark = ({id, isActive, place}: BookmarkProps) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleButtonClick = () => {
    dispatch(postFavorite({id, status: isActive ? 0 : 1} ));
  };

  return(
    <button
      className={`${place}__bookmark-button ${isActive && authorizationStatus === AuthorizationStatus.Auth ? `${place}__bookmark-button--active` : ''} button`} type={'button'}
      onClick={handleButtonClick}
    >
      <svg
        className={`${place}__bookmark-icon`}
        width={`${place === 'place-card' ? 18 : 31}`}
        height={`${place === 'place-card' ? 19 : 33}`}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className={'visually-hidden'}>${isActive && authorizationStatus === AuthorizationStatus.Auth ? 'From' : 'To'} bookmarks</span>
    </button>
  );
};

export default Bookmark;
