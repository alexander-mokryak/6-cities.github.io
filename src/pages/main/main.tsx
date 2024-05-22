import React from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import CardList from '../../components/card-list/card-list';

export default function Main (): JSX.Element {
  return(
    <main className={'page__main page__main--index'}>
      <h1 className={'visually-hidden'}>Cities</h1>
      <div className={'tabs'}>
        <section className={'locations container'}>
          <CitiesList />
        </section>
      </div>
      <div className={'cities'}>
        <CardList />
      </div>
    </main>
  );
}
