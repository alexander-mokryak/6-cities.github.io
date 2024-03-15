import {cities} from '../const';

export type CityName = typeof cities[number];

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
  image: string;
  price: number;
  rating: number;
  name: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  isPremium?: boolean;
  isFavorite: boolean;
  location: Location;
  city: {
    name: CityName;
  };
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
}
export type Comment = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User;
}
