import { createBrowserRouter, createRoutesFromElements, redirect, Route } from 'react-router-dom';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Showroom from './pages/Showroom';
import SignUp from './pages/SignUp';
import { getTasks } from '@/services/task.js';

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

          const id = sessionStorage.getItem('id');
          return getTasks(parseInt(id));
        }}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/showroom" loader={() => getTasks(1)} element={<Showroom />} />
      <Route path="/500" element={<ErrorPage />} />
    </Route>,
  ),
);
