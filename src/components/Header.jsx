import { Link } from 'react-router-dom';
import { ListTodo } from 'lucide-react';
import { useMemo } from 'react';

function Clock() {
  const getTime = useMemo(() => {
    const now = new Date();
    const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    const date = dayOfWeeks[now.getDay()];
    return `${month}/${day} (${date})`;
  }, []);

  return <span className="font-bold text-white">{getTime}</span>;
}

export default function Header() {
  return (
    <header className="bg-header h-[48px] shrink-0">
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
