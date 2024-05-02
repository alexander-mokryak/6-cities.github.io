import {SiteData} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {StoreSlice} from '../../const';
import {
  fetchComments,
  fetchFavoriteOffers,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  postComment,
  postFavorite
} from '../action';

const initialState: SiteData = {
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  nearbyOffers: [],
  comments: []
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })

      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }

        if (updatedOffer.isFavorite) {
          state.favoriteOffers = state.favoriteOffers.concat(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== updatedOffer.id);
        }
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
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
