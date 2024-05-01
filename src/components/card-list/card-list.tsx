import React, {useState} from 'react';
import SortingList from '../sorting-list/sorting-list';
import Map from '../map/map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {SortName} from '../../types/types';
import {setSorting} from '../../store/site-process/site-process';
import OfferCard from '../card/card';
import Spinner from '../spinner/spinner';
import {getCity, getSorting} from '../../store/site-process/selectors';
import {getIsOffersLoading, selectOffers} from '../../store/site-data/selectors';

const CardList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeSorting = useAppSelector(getSorting);
  const activeCity = useAppSelector(getCity);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const offers = useAppSelector(selectOffers);
  const [activeOffer, setActiveOffer] = useState<number | null>(null);

  const handleMouseMove = (id: number) => {
    setActiveOffer(id);
    window.console.log('mouse-move', id);
  };

  const handleMouseLeave = () => {
    setActiveOffer(null);
    window.console.log('mouse-leave', 'null');
  };

  const onSortingChange = (name: SortName) => {
    dispatch(setSorting(name));
  };

  if (isOffersLoading) {
    return <Spinner/>;
  }

  return(
    <>
      <section className={'cities__places places'}>
        <h2 className={'visually-hidden'}>Places</h2>
        <b className={'places__found'}>{offers.length} places to stay in {activeCity.name}</b>

        <SortingList onChange={onSortingChange} activeSorting={activeSorting}/>

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
      </section>
      <div className={'cities__right-section'}>
        <Map locations={offers.map(({ id, location }) => ({ id, ...location }))} city={activeCity} activeOffer={activeOffer} />
      </div>
    </>
  );
};

export default CardList;
