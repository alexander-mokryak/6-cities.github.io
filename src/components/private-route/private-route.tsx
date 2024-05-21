import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import Spinner from '../spinner/spinner';

interface IPrivateRouteProps {
  children: JSX.Element;
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
}

const PrivateRoute = ({children, restrictedFor, redirectTo}: IPrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  return(
    authorizationStatus !== restrictedFor ? children : <Navigate to={redirectTo}/>
  );
};

export default PrivateRoute;
