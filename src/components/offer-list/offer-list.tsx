import React, {useState} from 'react';
import {OfferListType} from '../../types/types';
import OfferCard from '../offer-card/offer-card';

export default function OfferList ({offers}: OfferListType):JSX.Element {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  window.console.log(activeOffer);

  const handleMouseMove = (id: number) => {
    setActiveOffer(id);
  };

  const handleMouseLeave = () => {
    setActiveOffer(null);
  };

  return(
    <div className={'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
