import React from 'react';
import {OfferCardType} from '../../types/types';
import OfferCard from '../offer-card/offer-card';

interface IOfferFavoriteListProps {
  offers: OfferCardType[];
}

export default function FavoriteList({offers}: IOfferFavoriteListProps) {

  const groupedOffersByCity = offers.reduce<{ [key: string ]: OfferCardType[] }>((acc, curr) => {
    if (curr.isFavorite) {
      const city = curr.city.name;
      if (!(city in acc)) {
        acc[city] = [];
      }
      acc[city].push(curr);
    }
    return acc;
  }, {});

  return(
    <ul className={'favorites__list'}>
      {Object.entries(groupedOffersByCity).map(([city, groupedOffers]) => (
        <li key={city} className={'favorites__locations-items'}>
          <div className={'favorites__locations locations locations--current'}>
            <div className={'locations__item'}>
              <a className={'locations__item-link'} href={'#'}>
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className={'favorites__places'}>
            {groupedOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                {...offer}
                place={'favorites'}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
