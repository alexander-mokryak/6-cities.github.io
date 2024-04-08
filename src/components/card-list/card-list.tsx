import React from 'react';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import {useAppSelector} from '../../hooks';

export default function CardList (): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  return(
    <>
      <section className={'cities__places places'}>
        <h2 className={'visually-hidden'}>Places</h2>
        <b className={'places__found'}>{offers.length} places to stay in {activeCity.name}</b>
        <form className={'places__sorting'} action={'#'} method={'get'}>
          <span className={'places__sorting-caption'}>Sort by</span>
          <span className={'places__sorting-type'} tabIndex={0}>
            Popular
            <svg className={'places__sorting-arrow'} width={'7'} height={'4'}>
              <use xlinkHref={'#icon-arrow-select'}></use>
            </svg>
          </span>
          <ul className={'places__options places__options--custom places__options--opened'}>
            <li className={'places__option places__option--active'} tabIndex={0}>Popular</li>
            <li className={'places__option'} tabIndex={0}>Price: low to high</li>
            <li className={'places__option'} tabIndex={0}>Price: high to low</li>
            <li className={'places__option'} tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className={'cities__places-list places__list tabs__content'}>
          <OfferList offers={offers}/>
        </div>
      </section>
      <div className={'cities__right-section'}>
        <Map city={activeCity} locations={offers.map((offer) => offer.location)} places={'cities'}/>
      </div>
    </>
  );
}