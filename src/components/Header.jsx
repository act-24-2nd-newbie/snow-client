import { Link } from 'react-router-dom';
import { ListTodo } from 'lucide-react';

function Clock() {
  return <span className="font-bold text-white">01/01 (Sun)</span>;
}

export default function Header() {
  return (
    <header className="bg-header h-[48px]">
      <nav className="mx-auto flex h-full max-w-[1280px] justify-between px-4">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <ListTodo className="h-6 w-6 text-white" />
          </Link>
          <Link to="/" className="text-2xl font-bold text-white">
            My Todo
          </Link>
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <Clock />
          <button type="button" className="rounded border px-3 py-1.5 text-sm text-white">
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
}
