import {SiteProcess} from '../../types/state';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cities, CityLocation, Sorting, StoreSlice} from '../../const';
import {CityName, SortName} from '../../types/types';

const initialState: SiteProcess = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]],
  },
  sorting: Sorting.Popular,
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = {
        name: action.payload,
        location: CityLocation[action.payload],
      };
    },
    setSorting: (state, action: PayloadAction<SortName>) => {
      state.sorting = action.payload;
    }
  },
});

export const {setCity, setSorting} = siteProcess.actions;
