import { useEffect, useId, useRef, useState } from 'react';
import { cx } from 'class-variance-authority';
import { Check, SendHorizonal, X } from 'lucide-react';
import Button from './Button';

/**
 * TextField component
 *
 * @typedef TextFieldProps
 * @prop {'text' | 'email'} [type]
 * @prop {string} [value]
 * @prop {string} [placeholder]
 * @prop {boolean} [border]
 * @prop {boolean} [selected]
 * @prop {boolean} [showSendButton]
 * @prop {string} [message]
 * @prop {'valid'|'invalid'} [messageStatus]
 * @prop {(value: string, valid: boolean) => void} [onChange]
 * @prop {() => void} [onSend]
 *
 * @param {TextFieldProps} param0
 */
export default function TextField({
  type = 'text',
  value: outer,
  placeholder,
  border = false,
  selected = false,
  showSendButton = true,
  message = '',
  messageStatus,
  onChange,
  onSend,
}) {
  const id = useId();
  const [inner, setInner] = useState('');
  const [valid, setValid] = useState(true);

  /** @type {ReturnType<typeof useRef<HTMLInputElement>>}  */
  const inputRef = useRef(null);

  const value = outer ?? inner;
  const defaultError = type === 'text' ? 'Invalid text format' : 'Invalid email format';

  /** @param {string} val  */
  function validate(val) {
    if (!val) {
      return true;
    } else {
      if (type === 'text') {
        return /^[a-zA-Z0-9\s가-힣\u3130-\u318F.,?@!'"]+$/.test(val);
      } else if (type === 'email') {
        return /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val);
      }
    }
  }

  useEffect(() => {
    selected && inputRef.current?.focus();
  }, [selected]);

  useEffect(() => {
    if (!value) setValid(true);
  }, [value]);

  /** @param {import('react').ChangeEvent<HTMLInputElement>} e */
  function handleChange(e) {
    setInner(e.target.value);
    const v = validate(e.target.value);
    setValid(v);

    const vv = messageStatus == null ? valid : messageStatus === 'valid';
    onChange?.(e.target.value, vv);
  }

  /** @param {import('react').MouseEvent<HTMLButtonElement>} e */
  function handleClearClick(e) {
    e.stopPropagation();

    setInner('');
    setValid(true);
    onChange?.('', true);
    inputRef.current?.focus();
  }

  /** @param {import('react').KeyboardEvent<HTMLInputElement>} e */
  function handleKeyUp(e) {
    if (e.key === 'Enter' && valid && messageStatus !== 'invalid') {
      onSend?.();
    }
  }

  function handleSendClick() {
    if (valid && messageStatus !== 'invalid') {
      onSend?.();
    }
  }

  return (
    <div>
      <div
        className={cx({
          'flex h-[60px] items-center rounded border bg-white px-4': border,
          'border-primary': border && valid,
          'border-warn': border && !valid,
          contents: !border,
        })}
      >
        <div className="flex grow justify-between gap-2">
          <div className="relative w-full">
            <input
              className={cx([
                'w-full py-1 pr-6 outline-none transition-colors focus:placeholder:invisible',
                { 'border-b': !border },
                { 'border-b-secondary focus:border-b-primary': valid },
                { 'border-b-warn focus:border-b-warn': messageStatus === 'invalid' || !valid },
              ])}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              id={id}
              ref={inputRef}
            />
            {value && (
              <button className="absolute bottom-0 right-0 top-0" onClick={handleClearClick}>
                <X className="h-6 w-6 text-secondary" />
              </button>
            )}
          </div>
          {showSendButton &&
            (type === 'text' ? (
              <button className="shrink-0" type="button" disabled={!value} onClick={handleSendClick}>
                <SendHorizonal
                  className={cx(['h-6 w-6 transition-colors', value ? 'text-primary' : 'text-secondary'])}
                />
              </button>
            ) : (
              <Button variant="secondary" size="sm" disabled={!value} onClick={handleSendClick}>
                {messageStatus === 'valid' ? <Check className="text-primary" /> : 'Check'}
              </Button>
            ))}
        </div>
      </div>
      {messageStatus != null ? (
        <p
          className={cx('max-w-full overflow-hidden text-xs', {
            'text-primary': messageStatus === 'valid',
            'text-warn': messageStatus !== 'valid',
          })}
        >
          {message}
        </p>
      ) : (
        !valid && <p className="max-w-full overflow-hidden text-xs text-warn">{defaultError}</p>
      )}
    </div>
  );
}
