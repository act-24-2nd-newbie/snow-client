import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';

export default function Test() {
  const [counter, setCounter] = useState(0);
  function handle() {
    console.log('!!!');
  }

  useEffect(() => {
    console.log('Load...');
    document.addEventListener('click', handle);

    return () => {
      console.log('Unload...');
      document.removeEventListener('click', handle);
    };
  }, []);

  return (
    <>
      <Header></Header>
      <main className="mx-10">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setCounter((c) => c + 1);
          }}
        >
          Count: {counter}
        </Button>
      </main>
    </>
  );
}
