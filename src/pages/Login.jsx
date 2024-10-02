// @ts-check
import Header from '@/components/Header';
import HeaderButton from '@/components/HeaderButton';
import TextField from '@/components/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleSend() {
    if (name) {
      sessionStorage.setItem('name', name);
      navigate('/home');
    }
  }

  return (
    <>
      <Header rightArea={<HeaderButton>Sign up</HeaderButton>} />
      <main className="flex h-full grow flex-col overflow-y-auto py-[60px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="ml-[120px] mr-8">
            <div className="">
              <p className="text-2xl text-welcome-foreground">Welcome Newbie!!</p>
              <p className="text-2xl text-welcome-foreground">
                MyTodo makes it easy to stay organized and manage your life.
              </p>
            </div>
            <p className="mt-6 text-[48px] font-bold text-welcome-foreground">What is your name?</p>
            <div className="mt-4 max-w-[680px]">
              <TextField
                placeholder="Input your name"
                value={name}
                onChange={setName}
                onSend={handleSend}
                maxLength={20}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
