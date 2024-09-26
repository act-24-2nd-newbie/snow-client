import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Outlet />
    </div>
  );
}

export default App;
