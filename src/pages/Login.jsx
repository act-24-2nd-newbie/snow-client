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
        <div className="mx-auto w-[1280px] border">Login</div>
        <div className="mx-auto w-[1280px] border px-4 py-4">
          <TextField placeholder="Input here" value={text} onChange={setText} onSend={handleSend} />
        </div>
        <div className="mx-auto w-[1280px] border px-4 py-4">
          <TextField placeholder="Input here" value={text} border={true} onChange={setText} onSend={handleSend} />
        </div>
      </main>
    </>
  );
}
