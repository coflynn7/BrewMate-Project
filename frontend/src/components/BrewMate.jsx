import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BrewMateLogin from './Auth/BrewMateLogin';
import BrewMateRegister from './Auth/BrewMateRegister';
import BrewMateHome from './Content/BrewMateHome';
import BrewSearch from './Content/BrewSearch';
import NoURLMatch from './Content/NoURLMatch';
import TopBeers from './Content/TopBeers';

function BrewMate() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<BrewMateLogin />} />
          <Route path="/login" element={<BrewMateLogin />}></Route>
          <Route path="/register" element={<BrewMateRegister />}></Route>
          <Route path="/home" element={<BrewMateHome />}></Route>
          <Route path="/topbeers" element={<TopBeers />}></Route>
          <Route path="/search" element={<BrewSearch />}></Route>
          <Route path="*" element={<NoURLMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BrewMate;