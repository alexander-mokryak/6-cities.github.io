import React from 'react';
import Header from '../../components/header/header';
import type {FormEvent} from 'react';
import {UserAuth} from '../../types/types';
import {useAppDispatch} from '../../hooks';
import {loginUser} from '../../store/action';

export default function Login () {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData);

    dispatch(loginUser(data));
  };

  return(
    <div className={'page page--gray page--login'}>
      <Header/>
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
              <a className={'locations__item-link'} href={'#'}>
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
