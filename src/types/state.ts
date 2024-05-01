import {store} from '../store/store';
import {City, OfferType, SortName, User, Comment} from './types';
import {AuthorizationStatus} from '../const';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type SiteData = {
  offers: OfferType[];
  isOffersLoading: boolean;
  offer: OfferType | null;
  isOfferLoading: boolean;
  nearbyOffers: OfferType[];
  comments: Comment[];
};

export type SiteProcess = {
  city: City;
  sorting: SortName;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
}
