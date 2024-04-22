import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {CityName, OfferType, SortName, User, UserAuth} from '../types/types';
import type { History } from 'history';
import {AxiosInstance} from 'axios';
import {ApiRoute, AppRoute} from '../const';
import {Token} from '../utils';

type Extra = {
  api: AxiosInstance;
  history: History;
}

export const Action = {
  SET_CITY: 'city/set',
  FETCH_OFFERS: 'offers/fetch',
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
