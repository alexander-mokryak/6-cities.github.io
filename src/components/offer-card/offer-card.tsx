import React from 'react';
import {OfferCardType} from '../../types/types';
import {AppRoute, STARS_COUNT, MAX_PERCENT_STARS_WIDTH} from '../../const';

export default function OfferCard(props: OfferCardType): JSX.Element {
  const handleMouseMove = () => {
    props.onMouseMove(props.id);
  };

  const onMouseLeave = () => {
    props.onMouseLeave();
  };

  return(
    <article
      className={'cities__place-card place-card'}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {props.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={'cities__image-wrapper place-card__image-wrapper'}>
        <a href={'#'}>
          <img className={'place-card__image'} src={props.image} width={'260'} height={'200'} alt={'Place image'}/>
        </a>
      </div>
      <div className={'place-card__info'}>
        <div className={'place-card__price-wrapper'}>
          <div className={'place-card__price'}>
            <b className={'place-card__price-value'}>&euro;{props.price}</b>
            <span className={'place-card__price-text'}>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${props.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type={'button'}>
            <svg className={'place-card__bookmark-icon'} width={'18'} height={'19'}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className={'visually-hidden'}>In bookmarks</span>
          </button>
        </div>
        <div className={'place-card__rating rating'}>
          <div className={'place-card__stars rating__stars'}>
            <span style={{width: `${(MAX_PERCENT_STARS_WIDTH * props.rating) / STARS_COUNT}%`}}></span>
            <span className={'visually-hidden'}>Rating</span>
          </div>
        </div>
        <h2 className={'place-card__name'}>
          {/* TODO Link to='' */}
          <a href={`${AppRoute.Room.replace(':id', `${props.id}`)}`}>{props.name}</a>
        </h2>
        <p className={'place-card__type'}>{props.type}</p>
      </div>
    </article>
  );
}
