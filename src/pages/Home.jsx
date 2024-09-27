import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import TextField from '@/components/TextField';
import { useEffect, useState } from 'react';
import EmptyTasks from '@/components/EmptyTasks';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const name = sessionStorage.getItem('name');
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [navigate, name]);

  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        {/* Top */}
        <div className="mx-auto w-full max-w-[1280px] shrink-0">
          <div className="ml-[60px]">
            <p className="text-welcome-foreground mt-6 text-2xl">Good afternoon, {name}.</p>
            <p className="text-welcome-foreground mt-4 text-2xl">You’ve got</p>
            <p className="text-welcome-foreground text-[48px] font-bold">2 / 2</p>
            <p className="text-welcome-foreground text-2xl">task(s) Today!</p>
          </div>
          <div className="mx-[60px] mb-6 mt-4">
            <TextField placeholder="Enter your task" maxLength={100} />
          </div>
        </div>
        {/* Tasks Wrapper */}
        <div className="bg-tasks grow">{!tasks.length ? <EmptyTasks /> : <></>}</div>
      </main>
    </>
  );
}
