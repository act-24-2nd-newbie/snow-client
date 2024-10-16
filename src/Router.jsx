import { createBrowserRouter, createRoutesFromElements, redirect, Route } from 'react-router-dom';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Showroom from './pages/Showroom';
import SignUp from './pages/SignUp';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={<Home />}
        loader={() => {
          if (!sessionStorage.getItem('name')) {
            return redirect('/');
          }
          return null;
        }}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/showroom" element={<Showroom />} />
    </Route>,
  ),
);
