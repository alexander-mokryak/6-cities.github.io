import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

interface IPrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute ({children}: IPrivateRouteProps) {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return(
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}
