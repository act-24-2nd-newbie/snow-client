import { createBrowserRouter, createRoutesFromElements, redirect, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Showroom from './pages/Showroom';
import Test from './pages/Test';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
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
      <Route path="/showroom" element={<Showroom />} />
      <Route path="/test" element={<Test />} />
    </Route>,
  ),
);
