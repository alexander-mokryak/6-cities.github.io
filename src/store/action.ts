import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {CityName, OfferType, SortName} from '../types/types';
import {AxiosInstance} from 'axios';
import {ApiRoute} from '../const';

export const Action = {
  SET_CITY: 'city/set',
  FETCH_OFFERS: 'offers/fetch',
  SET_SORTING: 'sorting/set'
};

export const setCity = createAction<CityName>(Action.SET_CITY);
export const setSorting = createAction<SortName>(Action.SET_SORTING);

//первый аргумент в асинхронной функции не используется — он нужен для передачи каких-то параметров при dispatch
export const fetchOffers = createAsyncThunk(Action.FETCH_OFFERS, async (_, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const {data} = await axios.get<OfferType[]>(ApiRoute.Offers);

  return data;
});
