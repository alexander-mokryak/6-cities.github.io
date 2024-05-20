import {name, image, internet, lorem, datatype} from 'faker';
import {City, Comment, Location, OfferType, User, UserAuth} from './types/types';
import {cities, CityLocation} from './const';
import {postFavorite} from './store/action';

export const makeFakeUserData = ():User => ({
  id: datatype.number(100),
  name: name.firstName(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: lorem.word(),
});

export const makeFakeUserAuthData = ():UserAuth => ({
  email: internet.email(),
  password: lorem.word(),
});

export const makeFakeOffer = ():OfferType => ({
  id: datatype.number(10),
  previewImage: image.imageUrl(),
  price: datatype.number(204),
  rating: datatype.number(4),
  title: lorem.text(),
  type: 'apartment',
  isPremium: datatype.boolean(),
  isFavorite: datatype.boolean(),
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  location: CityLocation[cities[0]],
  bedrooms: datatype.number(3),
  description: lorem.words(6),
  goods: ['dish washer', 'wi-fi'],
  host: makeFakeUserData(),
  images: [image.imageUrl(), image.imageUrl()],
  maxAdults: datatype.number(3),
});

export const makeFakeComment = (): Comment => ({
  id: datatype.number(100),
  comment: lorem.words(3),
  date: '19-05-2024',
  rating: 2.0,
  user: makeFakeUserData(),
});

export function makeFakeDetailedOffer() {
  return {
    id: datatype.number(100),
    title: lorem.words(3),
    type: lorem.word(),
    price: datatype.number(350),
    city: {
      name: cities[1],
      location: CityLocation[cities[1]]
    },
    location: CityLocation[cities[1]],
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number(4),
    description: lorem.words(10),
    bedrooms: datatype.number(2),
    goods: new Array(5).fill(null).map(() => lorem.word()),
    host: {
      name: name.firstName(),
      avatarUrl: image.avatar(),
      isPro: true,
    },
    images: new Array(5).fill(null).map(() => image.image()),
    maxAdults: datatype.number(5),
  };
}
