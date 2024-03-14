import React from 'react';
import {Comment} from '../../types/types';
import Review from '../review/review';
import Form from '../form/form';

type ReviewList = {
  reviews: Comment[];
}

export default function ReviewList ({reviews}: ReviewList) {
  return (
    <section className={'property__reviews reviews'}>
      <h2 className={'reviews__title'}>Reviews &middot; <span className={'reviews__amount'}>1</span></h2>
      {reviews.length > 0 && (
        <ul className="reviews__list">
          {reviews.map((review) => (
            <Review key={review.id} {...review}/>
          ))}
        </ul>
      )}
      <Form/>
    </section>
  );
}
