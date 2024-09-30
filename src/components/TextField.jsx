import { useEffect, useRef, useState } from 'react';
import { cx } from 'class-variance-authority';
import { SendHorizonal, X } from 'lucide-react';

/**
 * TextField component
 * @param {{
 * value?: string;
 * placeholder?: string;
 * maxLength?: number;
 * border?: boolean;
 * selected? : boolean;
 * onChange?: (value: string) => void;
 * onSend?: () => void;
 * }} param0
 * @returns
 */
export default function TextField({ value: outer, placeholder, maxLength, border, selected, onChange, onSend }) {
  const [inner, setInner] = useState('');
  /** @type {ReturnType<typeof useRef<HTMLInputElement>>}  */
  const inputRef = useRef(null);
  const value = outer ?? inner;

  useEffect(() => {
    selected && inputRef.current && inputRef.current.focus();
  }, [selected]);

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
    <div className={border ? 'flex h-[60px] items-center rounded border border-primary bg-white px-4' : 'contents'}>
      <div className="flex grow justify-between gap-2">
        <div className="relative w-full">
          <input
            className={cx([
              'w-full py-1 pr-6 outline-none focus:placeholder:invisible',
              !border && 'border-b border-b-secondary focus:border-b-primary',
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
              <X className="h-6 w-6 text-secondary" />
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
