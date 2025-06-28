import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Auth/Login';
import BrewMateHome from './Content/BrewMateHome';
import BrewSearch from './Content/BrewSearch';
import NoURLMatch from './Content/NoURLMatch';

function BrewMate() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<BrewMateHome />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/search" element={<BrewSearch />}></Route>
          <Route path="*" element={<NoURLMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BrewMate;