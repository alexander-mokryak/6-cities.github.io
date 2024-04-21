import { createReducer } from '@reduxjs/toolkit';
import {City, OfferType, SortName} from '../types/types';
import {fetchOffers, setCity, setSorting} from './action';
import {cities, CityLocation} from '../const';

type State = {
  city: City;
  offers: OfferType[];
  isOffersLoading: boolean;
  sorting: SortName;
}

const initialState: State = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  offers: [],
  isOffersLoading: false,
  sorting: 'Popular',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = {
        name: action.payload,
        location: CityLocation[action.payload]
      };
    })
    .addCase(fetchOffers.pending, (state, action) => {
      state.isOffersLoading = true;
    })
    //свойство fulfilled - оно схоже с состоянием Promise и говорит, что запрос был выполнен успешно
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    });
});
