import {Comparator, StoreSlice} from '../../const';
import {State} from '../../types/state';
import {Comment, OfferType} from '../../types/types';
import {createSelector} from '@reduxjs/toolkit';
import {getCity, getSorting} from '../site-process/selectors';

export const getIsOffersLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isOffersLoading;
export const getOffers = ({ [StoreSlice.SiteData]: SITE_DATA}: State): OfferType[] => SITE_DATA.offers;

export const getIsFavoriteOffersLoading = ({[StoreSlice.SiteData]: SITE_DATA}: State): boolean => SITE_DATA.isFavoriteOffersLoading;
export const getFavoriteOffers = ({[StoreSlice.SiteData]: SITE_DATA}: State): OfferType[] => SITE_DATA.favoriteOffers;

export const getIsOfferLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isOfferLoading;
export const getOffer = ({ [StoreSlice.SiteData]: SITE_DATA }: State): OfferType | null => SITE_DATA.offer;

export const getNearbyOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): OfferType[] => SITE_DATA.nearbyOffers;
export const getComments = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Comment[] => SITE_DATA.comments;

export const selectOffers = createSelector(
  [getOffers, getCity, getSorting],
  (offers, city, sorting) => offers.filter((offer) => offer.city.name === city.name).sort(Comparator[sorting])
);
