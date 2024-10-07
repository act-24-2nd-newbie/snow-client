import { toastAtom } from '@/atom/toastAtom';
import { cx } from 'class-variance-authority';
import { useAtom } from 'jotai';
import { X } from 'lucide-react';

function ToastItem({ message, state, onClose }) {
  return (
    <div
      className={cx(
        'flex w-full flex-row items-center justify-between overflow-hidden rounded bg-black px-5 text-white transition-[height]',
        { 'h-0': state === 0, 'h-[56px] origin-top': state === 1, 'h-0 origin-bottom': state === 2 },
      )}
    >
      <span className="grow overflow-hidden text-ellipsis">{message}</span>
      <button className="shrink-0" onClick={onClose}>
        <X />
      </button>
    </div>
  );
}

export default function ToastWrapper() {
  const [toasts, setToasts] = useAtom(toastAtom);

  /** @param {number} id */
  function handleClose(id) {
    // remove toast with animation
    setToasts((ts) => ts.map((t) => (t.id !== id ? t : { ...t, state: 2 })));
    setTimeout(() => setToasts((ts) => [...ts.filter((toast) => toast.id !== id)]), 150);
  }

  return (
    <div className="absolute bottom-10 left-0 right-0 z-10 mx-auto flex w-[600px] flex-col gap-2 bg-transparent">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} message={toast.message} state={toast.state} onClose={() => handleClose(toast.id)} />
      ))}
    </div>
  );
}
