import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/login/login';
import Main from './pages/main/main';
import Favorites from './pages/favorites/Favorites';
import Room from './pages/room/room';
import NotFound from './pages/not-found/not-found';

import {AppRoute, AuthorizationStatus} from './const';
import PrivateRoute from './components/private-route/private-route';

import {City, OfferType} from './types/types';

type AppProps = {
  city: City;
  offers: OfferType[];
};

function App({city, offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main city={city} offers={offers}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<Room/>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
