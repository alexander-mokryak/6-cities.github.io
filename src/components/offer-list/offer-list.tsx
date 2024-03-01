import React, {useState} from 'react';
import {OfferType} from '../../types/types';
import OfferCard from '../card/card';

interface IOfferListProps {
  offers: OfferType[];
}

export default function OfferList ({offers}: IOfferListProps):JSX.Element {
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
