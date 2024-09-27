import Header from '@/components/Header';
import TextField from '@/components/TextField';
import { useState } from 'react';

export default function Login() {
  const [text, setText] = useState('');

  function handleSend() {
    console.log(text);
    setText('');
  }

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <div className="mx-auto w-[1280px]">
          <div className="ml-[120px]">
            <div className="mt-[60px]">
              <p className="text-welcome text-2xl">Welcome Newbie!!</p>
              <p className="text-welcome text-2xl">MyTodo makes it easy to stay organized and manage your life.</p>
            </div>
            <p className="text-welcome mt-6 text-[48px] font-bold">What is your name?</p>
            <div className="mt-4 max-w-[680px]">
              <TextField placeholder="Input your name" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
