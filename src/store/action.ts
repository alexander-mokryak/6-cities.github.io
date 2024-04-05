import {createAction} from '@reduxjs/toolkit';
import {CityName, OfferType} from '../types/types';

export const Action = {
  SET_CITY: 'city/set',
  SET_OFFERS: 'offers/set'
};

export const setCity = createAction<CityName>(Action.SET_CITY);
export const setOffers = createAction<OfferType[]>(Action.SET_OFFERS);
