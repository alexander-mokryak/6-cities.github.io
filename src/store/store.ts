import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../api';
import {rootReducer} from './root-reducer';
import {fetchOffers, fetchUserStatus} from './action';
import history from '../history';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api,
        history
      }
    },
  }),
});

store.dispatch(fetchOffers());
store.dispatch(fetchUserStatus());
