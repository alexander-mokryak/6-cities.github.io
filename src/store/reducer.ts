import {createReducer} from '@reduxjs/toolkit';
import {City, OfferType, SortName, User} from '../types/types';
import {fetchOffers, fetchUserStatus, loginUser, setCity, setSorting} from './action';
import {AuthorizationStatus, cities, CityLocation} from '../const';

type State = {
  city: City;
  offers: OfferType[];
  isOffersLoading: boolean;
  sorting: SortName;
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
}

const initialState: State = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  offers: [],
  isOffersLoading: false,
  sorting: 'Popular',
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: '',
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
    // rejected - отклонен
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(fetchUserStatus.fulfilled, (state, action) => {
      state.user = action.payload.email;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(fetchUserStatus.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
});
