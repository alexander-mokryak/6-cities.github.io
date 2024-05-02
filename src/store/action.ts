import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {CityName, Comment, CommentAuth, OfferType, SortName, User, UserAuth} from '../types/types';
import type { History } from 'history';
import {AxiosError, AxiosInstance} from 'axios';
import {ApiRoute, AppRoute, HttpCode} from '../const';
import {Token} from '../utils';

type Extra = {
  api: AxiosInstance;
  history: History;
}

export const Action = {
  SET_CITY: 'city/set',
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  FETCH_NEARBY_OFFERS: 'offers/fetch-nearby',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  SET_SORTING: 'sorting/set',
  LOGIN_USER: 'user/login',
  FETCH_USER_STATUS: 'user/fetch-status'
};

export const setCity = createAction<CityName>(Action.SET_CITY);
export const setSorting = createAction<SortName>(Action.SET_SORTING);

//первый аргумент в асинхронной функции не используется — он нужен для передачи параметров при dispatch
export const fetchOffers = createAsyncThunk<OfferType[], undefined, { extra: Extra }>(
  Action.FETCH_OFFERS,
  async (_, { extra: extra }) => {
    const {api} = extra;
    const { data } = await api.get<OfferType[]>(ApiRoute.Offers);

    return data;
  });

export const fetchOffer = createAsyncThunk<OfferType, OfferType['id'], {extra: Extra}>(
  Action.FETCH_OFFER,
  async (id, {extra}) => {
    const {api, history} = extra;
    try {
      const {data} = await api.get<OfferType>(`${ApiRoute.Offers}/${id}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }
      // это позволит попасть в нужную ветку в reducer — fetchOffer.rejected
      // Подробнее про то, что может возвращать action можно прочитать в документации к createAsyncThunk
      return Promise.reject(error);
    }
  });

export const fetchFavoriteOffers = createAsyncThunk<OfferType[], undefined, { extra: Extra }>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferType[]>(ApiRoute.Favorite);

    return data;
  });

export const fetchNearbyOffers = createAsyncThunk<OfferType[], OfferType['id'], { extra: Extra }>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferType[]>(`${ApiRoute.Offers}/${id}/nearby`);

    return data;
  });

export const fetchComments = createAsyncThunk<Comment[], OfferType['id'], { extra: Extra }>(
  Action.FETCH_COMMENTS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Comment[]>(`${ApiRoute.Comments}/${id}`);

    return data;
  });

export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra: extra }) => {
    const {api} = extra;
    const { data } = await api.get<User>(ApiRoute.Login);

    return data;
  });

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User>(ApiRoute.Login, { email, password });
    const { token } = data;

    Token.save(token);
    // history.back();
    history.push(AppRoute.Main);

    return email;
  });

export const postComment = createAsyncThunk<Comment[], CommentAuth, { extra: Extra }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<Comment[]>(`${ApiRoute.Comments}/${id}`, { comment, rating });

    return data;
  });
