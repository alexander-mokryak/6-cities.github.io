import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus, getUser} from '../../store/user-process/selectors';
import {getFavoriteOffers} from '../../store/site-data/selectors';
import {logoutUser} from '../../store/action';

const Header = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const handleLogoutClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(logoutUser());
    }
  };

  return(
    <header className={'header'}>
      <div className={'container'}>
        <div className={'header__wrapper'}>
          <div className={'header__left'}>
            <Link className={'header__logo-link header__logo-link--active'} to={AppRoute.Main}>
              <img className={'header__logo'} src={'img/logo.svg'} alt={'6 cities logo'} width={'81'} height={'41'} />
            </Link>
          </div>
          <nav className={'header__nav'}>
            <ul className={'header__nav-list'}>
              {authorizationStatus === AuthorizationStatus.Auth && (
                <li className={'header__nav-item user'}>
                  <Link className={'header__nav-link header__nav-link--profile'} to={AppRoute.Favorites}>
                    <div className={'header__avatar-wrapper user__avatar-wrapper'}/>
                    <span className={'header__user-name user__name'}>{user}</span>
                    {favoriteOffers.length > 0 && (
                      <span className={'header__favorite-count'} style={{marginLeft: '6px'}}>{favoriteOffers.length}</span>
                    )}
                  </Link>
                </li>
              )}
              <li className={'header__nav-item'}>
                <Link
                  className={'header__nav-link'}
                  to={authorizationStatus === AuthorizationStatus.Auth ? AppRoute.Main : AppRoute.Login}
                  onClick={handleLogoutClick}
                >
                  <span className={'header__signout'}>{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
