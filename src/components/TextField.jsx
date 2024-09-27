import { cx } from 'class-variance-authority';
import { SendHorizonal, X } from 'lucide-react';
import { useState } from 'react';

/**
 * TextField component
 * @param {{
 * value?: string;
 * placeholder?: string;
 * maxLength?: number;
 * onChange?: (value: string) => void;
 * onSend?: () => void;
 * }} param0
 * @returns
 */
export default function TextField({ value: outer, placeholder, maxLength, onChange, onSend }) {
  const [inner, setInner] = useState('');
  const value = outer ?? inner;

  /** @param {import('react').KeyboardEvent<HTMLInputElement>} e */
  function handleChange(e) {
    setInner(e.target.value);
    onChange?.(e.target.value);
  }

  function handleClearClick() {
    setInner('');
    onChange?.('');
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
    <div className="flex justify-between gap-2">
      <div className="relative w-full">
        <input
          className="border-b-secondary focus:border-b-primary w-full border-b py-1 outline-none focus:placeholder:invisible"
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
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
  );
}
