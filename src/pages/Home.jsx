import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import TextField from '@/components/TextField';
import { useEffect } from 'react';

export default function Home() {
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
      <main className="flex flex-col">
        <div className="mx-auto w-[1280px]">
          <div className="ml-[60px]">
            <p className="mt-6 text-2xl">Good afternoon, {name}.</p>
            <p className="mt-4 text-2xl">You’ve got</p>
            <p className="text-[48px] font-bold">2 / 2</p>
            <p className="text-2xl">task(s) Today!</p>
          </div>
          <div className="mx-[60px] mt-4">
            <TextField placeholder="Enter your task" maxLength={100} />
          </div>
        </div>
      </main>
    </>
  );
}
