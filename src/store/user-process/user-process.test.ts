import {userProcess} from './user-process';
import {AuthorizationStatus} from '../../const';
import {fetchUserStatus, loginUser} from '../action';
import {makeFakeUserAuthData, makeFakeUserData} from '../../test-mocks';
import {UserProcess} from '../../types/state';

const mockUserData = makeFakeUserData();
const mockUserAuthData = makeFakeUserAuthData();

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: ''
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(
      userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    )
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      });
  });

  it('should fetch authorization status', () => {
    expect(
      userProcess.reducer(state, fetchUserStatus.fulfilled(mockUserData, '', undefined))
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUserData.email
    });

    expect(
      userProcess.reducer(state, { type: fetchUserStatus.rejected.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      });
  });

  it('should login user', () => {
    expect(userProcess.reducer(state, {type: loginUser.fulfilled.type, payload: mockUserAuthData.email}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUserAuthData.email
      });
  });
});
