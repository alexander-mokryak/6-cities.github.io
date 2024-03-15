import React from 'react';
import {OfferCardType} from '../../types/types';
import {AppRoute, STARS_COUNT, MAX_PERCENT_STARS_WIDTH} from '../../const';
import {Link} from 'react-router-dom';

export default function Card({
  id,
  image,
  price,
  rating,
  name,
  type,
  isPremium,
  isFavorite,
  place = 'cities',
  onMouseMove = () => void 0,
  onMouseLeave = () => void 0,
}: OfferCardType): JSX.Element {

  const handleMouseMove = () => {
    onMouseMove(id);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
  };

  return(
    <article
      className={`
        ${place === 'favorites' ? 'favorites__card' : ''}
        ${place === 'cities' ? 'cities__place-card' : ''}
        ${place === 'near-places' ? 'near-places__card' : ''}
        place-card
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${place}__image-wrapper place-card__image-wrapper`}>
        <a href={'#'}>
          <img className={'place-card__image'} src={image} width={'260'} height={'200'} alt={'Place image'}/>
        </a>
      </div>
      <div className={`${ place === 'favorites' ? 'favorites__card-info' : ''} place-card__info`}>
        <div className={'place-card__price-wrapper'}>
          <div className={'place-card__price'}>
            <b className={'place-card__price-value'}>&euro;{price}</b>
            <span className={'place-card__price-text'}>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type={'button'}>
            <svg className={'place-card__bookmark-icon'} width={'18'} height={'19'}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className={'visually-hidden'}>In bookmarks</span>
          </button>
        </div>
        <div className={'place-card__rating rating'}>
          <div className={'place-card__stars rating__stars'}>
            <span style={{width: `${(MAX_PERCENT_STARS_WIDTH * rating) / STARS_COUNT}%`}}></span>
            <span className={'visually-hidden'}>Rating</span>
          </div>
        </div>
        <h2 className={'place-card__name'}>
          <Link to={`${AppRoute.Room.replace(':id', `${id}`)}`}>{name}</Link>
        </h2>
        <p className={'place-card__type'}>{type}</p>
      </div>
    </article>
  );
}
