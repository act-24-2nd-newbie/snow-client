import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ListTodo } from 'lucide-react';

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

/**
 *
 * @param {{ rightArea?: import('react').ReactNode }} param0
 * @returns
 */
export default function Header({ rightArea }) {
  return (
    <header className="h-[48px] shrink-0 bg-header">
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
          {rightArea}
        </div>
      </nav>
    </header>
  );
}
