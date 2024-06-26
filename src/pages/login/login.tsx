import React from 'react';
import type {FormEvent} from 'react';
import {CityName, UserAuth} from '../../types/types';
import {useAppDispatch} from '../../hooks';
import {loginUser} from '../../store/action';
import {AppRoute, cities, getRandomElement, INVALID_PASSWORD_MESSAGE, VALID_PASSWORD_REGEXP} from '../../const';
import {Link} from 'react-router-dom';
import {setCity} from '../../store/site-process/site-process';
import {toast} from 'react-toastify';

interface loginForm {
  email: string;
  password: string;
}

export default function Login () {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData) as loginForm;

    if (!data.password.match(VALID_PASSWORD_REGEXP)) {
      toast.warn(INVALID_PASSWORD_MESSAGE);
      return;
    }

    dispatch(loginUser(data));
  };

  const handleLinkClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const cityName = evt.currentTarget.textContent as CityName;
    dispatch(setCity(cityName));
  };

  return(
    <main className={'page__main page__main--login'}>
      <div className={'page__login-container container'}>
        <section className={'login'}>
          <h1 className={'login__title'}>Sign in</h1>
          <form className={'login__form form'} action={'#'} method={'post'} onSubmit={handleFormSubmit}>
            <div className={'login__input-wrapper form__input-wrapper'}>
              <label className={'visually-hidden'}>E-mail</label>
              <input className={'login__input form__input'} type={'email'} name={'email'} placeholder={'Email'} required />
            </div>
            <div className={'login__input-wrapper form__input-wrapper'}>
              <label className={'visually-hidden'}>Password</label>
              <input className={'login__input form__input'} type={'password'} name={'password'} placeholder={'Password'} required />
            </div>
            <button className={'login__submit form__submit button'} type={'submit'}>Sign in</button>
          </form>
        </section>
        <section className={'locations locations--login locations--current'}>
          <div className={'locations__item'}>
            <Link className="locations__item-link" onClick={handleLinkClick} to={AppRoute.Main}>
              <span>{getRandomElement<CityName>(cities)}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
