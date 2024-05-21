import type {ChangeEvent, FormEvent} from 'react';
import React, {Fragment, useEffect, useState} from 'react';
import {MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, STARS_COUNT, SubmitStatus} from '../../const';
import {CommentAuth} from '../../types/types';

type FormProps = {
  onSubmit: (formData: Omit<CommentAuth, 'id'>) => void;
  submitStatus: SubmitStatus;
}

const Form = ({onSubmit, submitStatus}: FormProps) => {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const isSubmitting = submitStatus === SubmitStatus.Pending;

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      comment: text,
      rating
    });
  };

  useEffect(() => {
    if (submitStatus === SubmitStatus.Fullfilled) {
      setText('');
      setRating(0);
    }
  }, [submitStatus]);

  return (
    <form className={'reviews__form form'} action={'/'} method={'post'} onSubmit={handleSubmit}>
      <label className={'reviews__label form__label'} htmlFor={'review'}>
        Your review
      </label>
      <div className={'reviews__rating-form form__rating'}>
        {Array.from({ length: STARS_COUNT}, (_,i) => (
          <Fragment key={`Star ${STARS_COUNT - i}`}>
            <input
              className={'form__rating-input visually-hidden'}
              name={'rating'}
              defaultValue={STARS_COUNT - i}
              id={`${STARS_COUNT - i}-stars`}
              type={'radio'}
              checked={STARS_COUNT - i === rating}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${STARS_COUNT - i}-stars`}
              className={'reviews__rating-label form__rating-label'}
            >
              <svg className={'form__star-image'} width={37} height={33}>
                <use xlinkHref={'#icon-star'}/>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className={'reviews__textarea form__textarea'}
        id={'review'}
        name={'review'}
        value={text}
        placeholder={'Tell how was your stay, what you like and what can be improved'}
        onChange={handleTextareaChange}
        disabled={isSubmitting}
      />
      <div className={'reviews__button-wrapper'}>
        <p className={'reviews__help'}>
            To submit review please make sure to set{' '}
          <span className={'reviews__star'}>rating</span> and describe your stay
            with at least <b className={'reviews__text-amount'}>50 characters</b>.
        </p>
        <button
          className={'reviews__submit form__submit button'}
          type={'submit'}
          disabled={isSubmitting || !rating || (text.length < MIN_COMMENT_LENGTH || text.length > MAX_COMMENT_LENGTH)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
