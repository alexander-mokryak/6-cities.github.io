import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from '../pages/login/Login';
import Main from '../pages/main/main';
import Favorites from '../pages/favorites/Favorites';
import Room from '../pages/room/Room';
import NotFound from '../pages/not-found/not-found';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/favorites'} element={<Favorites/>}/>
        <Route path={'/offer/:id'} element={<Room/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
