import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
    </Route>,
  ),
);
