import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, StoreSlice} from '../../const';
import {UserProcess} from '../../types/state';
import {fetchUserStatus, loginUser} from '../action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: '',
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload.email;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      });
  }
});
