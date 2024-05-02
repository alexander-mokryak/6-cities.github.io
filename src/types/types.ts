import {cities, Sorting} from '../const';

export type CityName = typeof cities[number];
export type SortName = keyof typeof Sorting;

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: CityName;
  location: Location;
}

export type OfferType = {
  id: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  isPremium?: boolean;
  isFavorite: boolean;
  location: Location;
  city: City;
  bedrooms: number;
  description: string;
  goods: [string];
  host: User;
  images: [string];
  maxAdults: number;
}

export type OfferCardType = OfferType & {
  onMouseMove?: (id: number) => void;
  onMouseLeave?: () => void;
  place?: 'cities' | 'favorites' | 'near-places';
};

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type UserAuth = Pick<User, 'email'> & { password: string };

export type Comment = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

export type CommentAuth = Pick<Comment, 'comment' | 'rating'> & Pick<OfferType, 'id'>;
export type FavoriteAuth = Pick<OfferType, 'id'> & {status: 1 | 0};
