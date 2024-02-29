import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/login/login';
import Main from './pages/main/main';
import Favorites from './pages/favorites/Favorites';
import Room from './pages/room/room';
import NotFound from './pages/not-found/not-found';

import {AppRoute, AuthorizationStatus} from './const';
import PrivateRoute from './components/private-route/private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;