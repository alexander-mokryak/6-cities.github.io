export type Offer = {
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

export type OfferCardType = Offer & {
  onMouseMove: (id: number) => void;
  onMouseLeave: () => void;
};

export type OfferListType = {
  offers: Offer[];
};
