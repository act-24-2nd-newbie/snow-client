import { createBrowserRouter, createRoutesFromElements, redirect, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route
        path="home"
        element={<Home />}
        loader={() => {
          if (!sessionStorage.getItem('name')) {
            return redirect('/');
          }
          return null;
        }}
      />
    </Route>,
  ),
);
