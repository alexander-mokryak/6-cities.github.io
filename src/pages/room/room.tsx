import React, {useEffect} from 'react';
import Header from '../../components/header/header';
import Card from '../../components/card/card';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import {useParams} from 'react-router-dom';
import {fetchComments, fetchNearbyOffers, fetchOffer, postComment} from '../../store/action';
import {capitalize, getStarsWidth, pluralize} from '../../utils';
import {CommentAuth} from '../../types/types';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {
  getCommentStatus,
  getIsOfferLoading,
  getNearbyOffers,
  getOffer,
  selectComments
} from '../../store/site-data/selectors';
import Bookmark from '../../components/bookmark/bookmark';

const Room = (): JSX.Element | null => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const offer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const comments = useAppSelector(selectComments);
  const commentStatus = useAppSelector(getCommentStatus);

  useEffect(() => {
    const {id} = params;
    if (id) {
      const parseId = Number(id);
      dispatch(fetchOffer(parseId));
      dispatch(fetchNearbyOffers(parseId));
      dispatch(fetchComments(parseId));
    }
  }, [params, dispatch]);

  if (!offer) {
    return null;
  }

  if (isOfferLoading) {
    return <Spinner/>;
  }

  const {
    id, images, isPremium, isFavorite, title, rating, type, bedrooms,
    maxAdults, price, goods, host, description, city, location
  } = offer;

  const locations = nearbyOffers.map(({ id: nearbyId, location: nearbyLocation, }) => ({ id: nearbyId, ...nearbyLocation }));
  locations.push({ id, ...location });

  const onFormSubmit = (formData: Omit<CommentAuth, 'id'>) => {
    dispatch(postComment({ id, ...formData }));
  };

  return(
    <main className={'page__main page__main--property'}>
      <section className={'property'}>
        <div className={'property__gallery-container container'}>
          <div className={'property__gallery'}>
            {images.map((image: string) => (
              <div key={image} className={'property__image-wrapper'}>
                <img className={'property__image'} src={image} alt={'studio'} />
              </div>
            ))}
          </div>
        </div>
        <div className={'property__container container'}>
          <div className={'property__wrapper'}>
            {isPremium && (
              <div className={'property__mark'}>
                <span>Premium</span>
              </div>
            )}
            <div className={'property__name-wrapper'}>
              <h1 className={'property__name'}>{title}</h1>
              <Bookmark id={id} isActive={isFavorite} place={'property'}/>
            </div>
            <div className={'property__rating rating'}>
              <div className={'property__stars rating__stars'}>
                <span style={{width: getStarsWidth(rating)}}></span>
                <span className={'visually-hidden'}>Rating</span>
              </div>
              <span className={'property__rating-value rating__value'}>
                {rating}
              </span>
            </div>
            <ul className={'property__features'}>
              <li className={'property__feature property__feature--entire'}>
                {capitalize(type)}
              </li>
              <li className={'property__feature property__feature--bedrooms'}>
                {bedrooms} {pluralize('Bedroom', bedrooms)}
              </li>
              <li className={'property__feature property__feature--adults'}>
                Max {maxAdults} {pluralize('adult', maxAdults)}
              </li>
            </ul>
            <div className={'property__price'}>
              <b className={'property__price-value'}>&euro;{price}</b>
              <span className={'property__price-text'}>&nbsp;night</span>
            </div>
            <div className={'property__inside'}>
              <h2 className={'property__inside-title'}>What&apos;s inside</h2>
              {goods.length > 0 && (
                <ul className={'property__inside-list'}>
                  {goods.map((good) => (
                    <li key={good} className={'property__inside-item'}>
                      {good}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={'property__host'}>
              <h2 className={'property__host-title'}>Meet the host</h2>
              <div className={'property__host-user user'}>
                <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                  <img
                    className={'property__avatar user__avatar'} src={host.avatarUrl}
                    width={'74'} height={'74'} alt={host.name}
                  />
                </div>
                <span className={'property__user-name'}>
                  {host.name}
                </span>
                {host.isPro && (
                  <span className={'property__user-status'}>Pro</span>
                )}
              </div>
              <div className={'property__description'}>
                <p className={'property__text'}>
                  {description}
                </p>
              </div>
            </div>
            <ReviewList
              reviews={comments}
              authorizationStatus={authorizationStatus}
              onSubmit={onFormSubmit}
              submitStatus={commentStatus}
            />
          </div>
        </div>
        <Map city={city} locations={locations} activeOffer={id} place={'property'} />
      </section>
      <div className={'container'}>
        <section className={'near-places places'}>
          <h2 className={'near-places__title'}>Other places in the neighbourhood</h2>
          <div className={'near-places__list places__list'}>
            {nearbyOffers.map((nearbyOffer) => <Card key={nearbyOffer.id} {...nearbyOffer}/> )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Room;
