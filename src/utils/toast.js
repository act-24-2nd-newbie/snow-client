import { useAtom } from 'jotai';
import { toastAtom } from '@/atom/toastAtom';

export function useToast() {
  const [toasts, setToasts] = useAtom(toastAtom);

  /** @param {string} message */
  function addToast(message) {
    const newId = Math.floor(Math.random() * 100000000);
    if (toasts.length < 4) setToasts((ts) => [{ id: newId, message, state: 0 }, ...ts]);
    else setToasts((ts) => [{ id: newId, message, state: 0 }, ...ts.toSpliced(-1, 1)]);

    // for animation
    setTimeout(() => setToasts((ts) => ts.map((t) => (t.id !== newId ? t : { ...t, state: 1 }))), 50);

    setTimeout(() => {
      setToasts((ts) => ts.map((t) => (t.id !== newId ? t : { ...t, state: 2 })));
      setTimeout(() => setToasts((ts) => [...ts.filter((t) => t.id !== newId)]), 150);
    }, 3000);
  }

  return { addToast };
}
