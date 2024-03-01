import {OfferType} from '../types/types';
export const Offers: OfferType[] = [
  {
    id: 1,
    image: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.4,
    name: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    isPremium: true,
    isFavorite: false,
    city: {
      name: 'Amsterdam'
    }
  },
  {
    id: 2,
    image: 'img/room.jpg',
    price: 80,
    rating: 3.6,
    name: 'Wood and stone place',
    type: 'room',
    isPremium: false,
    isFavorite: true,
    city: {
      name: 'Paris'
    }
  },
  {
    id: 3,
    image: 'img/apartment-02.jpg',
    price: 132,
    rating: 4.8,
    name: 'Canal View Prinsengracht',
    type: 'apartment',
    isPremium: false,
    isFavorite: false,
    city: {
      name: 'Paris'
    }
  },
  {
    id: 4,
    image: 'img/apartment-03.jpg',
    price: 180,
    rating: 4.3,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    isPremium: true,
    isFavorite: true,
    city: {
      name: 'Amsterdam'
    }
  },
  {
    id: 5,
    image: 'img/room.jpg',
    price: 80,
    rating: 4.1,
    name: 'Wood and stone place',
    type: 'room',
    isPremium: false,
    isFavorite: false,
    city: {
      name: 'Paris'
    }
  },
];
