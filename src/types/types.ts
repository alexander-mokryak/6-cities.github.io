export type OfferType = {
  id: number;
  image: string;
  price: number;
  rating: number;
  name: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  isPremium?: boolean;
  isFavorite: boolean;
  city: {
    name: string;
  };
}

export type OfferCardType = OfferType & {
  onMouseMove?: (id: number) => void;
  onMouseLeave?: () => void;
  place?: 'cities' | 'favorites';
};
