import {Comment, OfferType} from '../../types/types';
import {siteData} from './site-data';
import {SiteData} from '../../types/state';
import {
  fetchComments,
  fetchFavoriteOffers,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  postComment,
  postFavorite
} from '../action';
import {makeFakeComment, makeFakeOffer} from '../../test-mocks';
import {SubmitStatus} from '../../const';

const offers: OfferType[] = [makeFakeOffer()];
const comments: Comment = makeFakeComment();

describe('Reducer: userProcess', () => {
  let initialState: SiteData;

  beforeEach(() => {
    initialState = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(siteData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should fetch offers', () => {
    expect(siteData.reducer(initialState, { type: fetchOffers.pending.type }))
      .toEqual({
        ...initialState,
        isOffersLoading: true
      });

    expect(siteData.reducer(initialState, { type: fetchOffers.fulfilled.type, payload: offers }))
      .toEqual({
        ...initialState,
        offers
      });

    expect(siteData.reducer(initialState, { type: fetchOffers.rejected.type }))
      .toEqual(initialState);
  });

  it('should fetch offer', () => {
    expect(siteData.reducer(initialState, { type: fetchOffer.pending.type }))
      .toEqual({
        ...initialState,
        isOfferLoading: true,
      });

    expect(siteData.reducer(initialState, { type: fetchOffer.fulfilled.type, payload: offers }))
      .toEqual({
        ...initialState,
        offer: offers
      });

    expect(siteData.reducer(initialState, { type: fetchOffer.rejected.type }))
      .toEqual({
        ...initialState,
        isOfferLoading: true,
      });
  });

  it('should fetch favorite offers', () => {
    expect(siteData.reducer(initialState, { type: fetchFavoriteOffers.pending.type }))
      .toEqual({
        ...initialState,
        isFavoriteOffersLoading: true,
      });

    expect(siteData.reducer(initialState, { type: fetchFavoriteOffers.fulfilled.type, payload: offers }))
      .toEqual({
        ...initialState,
        favoriteOffers: offers,
      });

    expect(siteData.reducer(initialState, { type: fetchFavoriteOffers.rejected.type }))
      .toEqual(initialState);
  });

  it('should fetch nearby offers', () => {
    expect(siteData.reducer(initialState, { type: fetchNearbyOffers.fulfilled.type, payload: offers }))
      .toEqual({
        ...initialState,
        nearbyOffers: offers,
      });
  });

  it('should fetch nearby comments', () => {
    expect(siteData.reducer(initialState, { type: fetchComments.fulfilled.type, payload: comments }))
      .toEqual({
        ...initialState,
        comments,
      });
  });

  it('should post comment', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: postComment.pending.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Pending,
      });

    expect(siteData.reducer(state, { type: postComment.fulfilled.type, payload: comments }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments,
        commentStatus: SubmitStatus.Fullfilled,
      });

    expect(siteData.reducer(state, { type: postComment.rejected.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Rejected,
      });
  });

  //TODO check this test's
  it('should post favorite', () => {
    const state = {
      ...initialState,
      offers,
    };

    expect(siteData.reducer(state, { type: postFavorite.fulfilled.type, payload: {...offers[0], isFavorite: true } }))
      .toEqual({
        ...state,
        offers: [{...offers[0], isFavorite: true }],
        favoriteOffers: [{...offers[0], isFavorite: true }],
      });

    expect(siteData.reducer(state, { type: postFavorite.fulfilled.type, payload: {...offers[0], isFavorite: false } }))
      .toEqual({
        offers,
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
      });
  });
});
