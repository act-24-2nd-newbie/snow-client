import { cx } from 'class-variance-authority';
import { SendHorizonal, X } from 'lucide-react';
import { useRef, useState } from 'react';

/**
 * TextField component
 * @param {{
 * value?: string;
 * placeholder?: string;
 * maxLength?: number;
 * border?: boolean;
 * onChange?: (value: string) => void;
 * onSend?: () => void;
 * }} param0
 * @returns
 */
export default function TextField({ value: outer, placeholder, maxLength, border, onChange, onSend }) {
  const [inner, setInner] = useState('');
  /** @type {import('react').MutableRefObject<HTMLInputElement>}  */
  const inputRef = useRef(null);
  const value = outer ?? inner;

  /** @param {import('react').KeyboardEvent<HTMLInputElement>} e */
  function handleChange(e) {
    setInner(e.target.value);
    onChange?.(e.target.value);
  }

  function handleClearClick() {
    setInner('');
    onChange?.('');
    inputRef.current?.focus();
  }

  /** @param {import('react').KeyboardEvent<HTMLInputElement>} e */
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      onSend?.();
    }
  }

  function handleSendClick() {
    onSend?.();
  }

  return (
    <div className={border ? 'border-primary flex h-[60px] items-center rounded border px-4' : 'contents'}>
      <div className="flex grow justify-between gap-2">
        <div className="relative w-full">
          <input
            className={cx([
              'w-full py-1 pr-6 outline-none focus:placeholder:invisible',
              !border && 'border-b-secondary focus:border-b-primary border-b',
            ])}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            ref={inputRef}
          />
          {value && (
            <button className="absolute bottom-0 right-0 top-0" onClick={handleClearClick}>
              <X className="text-secondary h-6 w-6" />
            </button>
          )}
        </div>
        <button type="button" disabled={!value} onClick={handleSendClick}>
          <SendHorizonal className={cx(['h-6 w-6', value ? 'text-primary' : 'text-secondary'])} />
        </button>
      </div>
    </div>
  );
}
