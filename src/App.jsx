import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Outlet />
    </div>
  );
}

export default App;
