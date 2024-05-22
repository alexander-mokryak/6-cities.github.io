import React from 'react';
import Header from '../../components/header/header';
import FavoriteList from '../../components/favorite-list/favorite-list';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getFavoriteOffers, getIsFavoriteOffersLoading} from '../../store/site-data/selectors';
import Spinner from '../../components/spinner/spinner';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

const Favorites = ():JSX.Element => {
  const isFavoriteOffersLoading = useAppSelector(getIsFavoriteOffersLoading);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  if (isFavoriteOffersLoading) {
    return <Spinner/>;
  }

  return(
    <>
      <main className={`page__main page__main--favorites ${favoriteOffers.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className={'page__favorites-container container'}>
          {favoriteOffers.length > 0 ? (
            <section className={'favorites'}>
              <h1 className={'favorites__title'}>Saved listing</h1>
              <FavoriteList offers={favoriteOffers}/>
            </section>
          ) : (
            <FavoritesEmpty/>
          )}
        </div>
      </main>
      <footer className={'footer container'}>
        <Link to={'/'} className={'footer__logo-link'}>
          <img className={'footer__logo'} src={'img/logo.svg'} alt={'6 cities logo'} width={'64'} height={'33'} />
        </Link>
      </footer>
    </>
  );
};

export default Favorites;
