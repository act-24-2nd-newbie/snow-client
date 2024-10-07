import { Outlet } from 'react-router-dom';
import ToastWrapper from './components/ToastWrapper';

function App() {
  return (
    <>
      <Outlet />
      <ToastWrapper />
    </>
  );
}

export default App;
