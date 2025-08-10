import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BrewMateLogin from './Auth/BrewMateLogin';
import BrewMateRegister from './Auth/BrewMateRegister';
import BrewMateHome from './Content/BrewMateHome';
import BrewSearch from './Content/BrewSearch';
import NoURLMatch from './Content/NoURLMatch';
import BrewFavorites from './Content/BrewFavorites';
import TopBeers from './Content/TopBeers';
import TopBreweries from './Content/TopBreweries';
import MostFavoritedBrews from './Content/MostFavoritedBrews';

import { FavoritesProvider } from './Contexts/FavoritesContext';
import { UserProvider } from './Contexts/UserContext';

function BrewMate() {

  return (
    <UserProvider>
    <FavoritesProvider>
    <BrowserRouter>
      <Routes>
          <Route index element={<BrewMateLogin />} />
          <Route path="/login" element={<BrewMateLogin />}></Route>
          <Route path="/register" element={<BrewMateRegister />}></Route>
          <Route path="/home" element={<BrewMateHome />}></Route>
          <Route path="/favorites" element={<BrewFavorites />}></Route>
          <Route path="/topBeers" element={<TopBeers />}></Route>
          <Route path="/topBreweries" element={<TopBreweries />}></Route>
          <Route path="/mostFavorited" element={<MostFavoritedBrews />}></Route>
          <Route path="/search" element={<BrewSearch />}></Route>
          <Route path="*" element={<NoURLMatch />} />
      </Routes>
    </BrowserRouter>
    </FavoritesProvider>
    </UserProvider>
  );
}

export default BrewMate;