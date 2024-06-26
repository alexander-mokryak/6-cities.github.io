import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import history from './history';

import Login from './pages/login/login';
import Main from './pages/main/main';
import Favorites from './pages/favorites/Favorites';
import Room from './pages/room/room';
import NotFound from './pages/not-found/not-found';

import {AppRoute, AuthorizationStatus} from './const';
import PrivateRoute from './components/private-route/private-route';
import Header from './components/header/header';

function App(): JSX.Element {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route element={<Header />}>
          <Route
            index
            element={<Main/>}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Main}>
                <Login/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
                <Favorites/>
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
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
