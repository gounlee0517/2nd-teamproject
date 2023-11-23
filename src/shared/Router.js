import React from 'react';
import Main from '../components/Layout/Main';
import Detail from '../pages/Detail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
