import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {setOffers} from './action';
import Offers from '../mocks/offers';

export const store = configureStore({
  reducer
});

store.dispatch(setOffers(Offers));
