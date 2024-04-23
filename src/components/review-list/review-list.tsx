import React from 'react';
import {Comment} from '../../types/types';
import Review from '../review/review';
import Form from '../form/form';
import {AuthorizationStatus} from '../../const';

type ReviewList = {
  reviews: Comment[];
  authorizationStatus: AuthorizationStatus;
}

export default function ReviewList ({reviews, authorizationStatus}: ReviewList) {
  if (reviews.length === 0) {
    return(
      <section className={'property__reviews reviews'}>
        {authorizationStatus === AuthorizationStatus.Auth && <Form/>}
      </section>
    );
  }
  return (
    <section className={'property__reviews reviews'}>
      <h2 className={'reviews__title'}>
        Reviews &middot; <span className={'reviews__amount'}>{reviews.length}</span>
      </h2>
      <ul className={'reviews__list'}>
        {reviews.map((review) => (
          <Review key={review.id} {...review}/>
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <Form/>}
    </section>
  );
}
