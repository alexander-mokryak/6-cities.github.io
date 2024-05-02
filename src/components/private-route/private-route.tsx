import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import Spinner from '../spinner/spinner';

interface IPrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({children}: IPrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  return(
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
};

export default PrivateRoute;
