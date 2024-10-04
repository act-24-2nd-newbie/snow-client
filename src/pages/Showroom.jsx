import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Drowdown';
import Header from '@/components/Header';
import TextField from '@/components/ui/TextField';

function TextHeader({ children }) {
  return <h1 className="text-xl font-bold">{children}</h1>;
}

function ButtonWrapper({ children }) {
  return <div className="flex flex-row gap-8">{children}</div>;
}

export default function Showroom() {
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
      </main>
    </>
  );
}
