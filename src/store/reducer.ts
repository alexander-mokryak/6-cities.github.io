import {createReducer} from '@reduxjs/toolkit';
import {City, OfferType, SortName, User, Comment} from '../types/types';
import {
  fetchComments,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  fetchUserStatus,
  loginUser,
  setCity,
  setSorting
} from './action';
import {AuthorizationStatus, cities, CityLocation} from '../const';

type State = {
  city: City;
  offers: OfferType[];
  isOffersLoading: boolean;
  offer: OfferType | null;
  sorting: SortName;
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
  nearbyOffers: OfferType[];
  comments: Comment[];
}

const initialState: State = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  offers: [],
  isOffersLoading: false,
  offer: null,
  sorting: 'Popular',
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: '',
  nearbyOffers: [],
  comments: [],
};
//fulfilled == Promise - запрос был выполнен успешно
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
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })

    .addCase(fetchOffer.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.isOffersLoading = true;
    })

    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })

    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
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
