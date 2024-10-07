import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Drowdown';
import Header from '@/components/Header';
import TextField from '@/components/ui/TextField';
import { useToast } from '@/utils/toast';
import { useState } from 'react';
import Grow from '@/components/ui/Grow';

function TextHeader({ children }) {
  return <h1 className="text-xl font-bold">{children}</h1>;
}

function ButtonWrapper({ children }) {
  return <div className="flex flex-row gap-8">{children}</div>;
}

export default function Showroom() {
  const [items, setItems] = useState([]);

  const { addToast } = useToast();
  function handleAddToastClick() {
    addToast('Toast Message ' + Math.floor(Math.random() * 100));
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1280px] py-4">
        <div className="flex flex-col gap-3 py-2">
          <TextHeader>Buttons</TextHeader>
          <ButtonWrapper>
            <Button variant="ghost">Clear</Button>
            <Button variant="ghost" disabled>
              Clear
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant="primary">Clear</Button>
            <Button variant="primary" disabled>
              Clear
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button variant="secondary">Clear</Button>
            <Button variant="secondary" disabled>
              Clear
            </Button>
          </ButtonWrapper>
        </div>
        <div className="flex flex-col gap-3 py-2">
          <TextHeader>TextField</TextHeader>
          <TextField />
          <TextField border />
        </div>
        <div className="flex flex-col gap-3 py-2">
          <TextHeader>Dropdown</TextHeader>
          <Dropdown
            value={0}
            items={[
              { label: 'Item1', value: 0 },
              { label: 'Item2', value: 1 },
            ]}
          />
        </div>
        <div className="flex flex-col gap-3 py-2">
          <TextHeader>Toast</TextHeader>
          <Button variant="primary" onClick={handleAddToastClick}>
            Add Toast
          </Button>
        </div>
        <div className="flex flex-col gap-3 py-2">
          <TextHeader>Animation</TextHeader>
          <label>
            <Button
              onClick={() => {
                const newId = Math.random();
                setItems((prev) => [...prev, { id: newId }]);
                setTimeout(() => setItems((prev) => prev.map((i) => (i.id !== newId ? i : { ...i, show: 1 }))), 0);
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setItems((prev) => prev.map((i, idx) => (idx !== 0 ? i : { ...i, show: 2 })));
                setTimeout(() => {
                  setItems((prev) => prev.toSpliced(0, 1));
                }, 150);
              }}
            >
              Remove
            </Button>
            {items.map(({ id, show }) => (
              <Grow key={id} show={show} />
            ))}
          </label>
        </div>
      </main>
    </>
  );
}
