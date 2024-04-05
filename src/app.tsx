import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';

import Login from './pages/login/login';
import Main from './pages/main/main';
import Favorites from './pages/favorites/Favorites';
import Room from './pages/room/room';
import NotFound from './pages/not-found/not-found';

import {AppRoute, AuthorizationStatus} from './const';
import PrivateRoute from './components/private-route/private-route';

import {City, OfferType, Comment} from './types/types';

type AppProps = {
  city: City;
  offers: OfferType[];
  reviews: Comment[];
};

function App({city, offers, reviews}: AppProps): JSX.Element {
  return (
    <Provider store={store}>
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
                <Favorites offers={offers} reviews={reviews}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={<Room city={city} nearbyOffers={offers} reviews={reviews}/>}
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
