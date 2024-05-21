import React from 'react';
import {Comment, CommentAuth} from '../../types/types';
import Review from '../review/review';
import Form from '../form/form';
import {AuthorizationStatus, SubmitStatus} from '../../const';

type ReviewList = {
  reviews: Comment[];
  authorizationStatus: AuthorizationStatus;
  onSubmit: (formData: Omit<CommentAuth, 'id'>) => void;
  submitStatus: SubmitStatus;
}

export default function ReviewList ({reviews, authorizationStatus, onSubmit, submitStatus}: ReviewList) {
  if (reviews.length === 0) {
    return(
      <section className={'property__reviews reviews'}>
        {authorizationStatus === AuthorizationStatus.Auth && <Form onSubmit={onSubmit} submitStatus={submitStatus}/>}
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
      {authorizationStatus === AuthorizationStatus.Auth && <Form onSubmit={onSubmit} submitStatus={submitStatus}/>}
    </section>
  );
}
