import { cx } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

/**
 * Dropdown component
 *
 * @typedef {object} DropdownProps
 * @prop {DropdownItem[]} items
 * @prop {string | number} [value]
 * @prop {(value: string | number) => void} [onChange]
 *
 * @param {DropdownProps} param0
 */
export default function Dropdown({ items, value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = items && items.filter((item) => item.value == value)[0];

  function handleClick() {
    setOpen((o) => !o);
  }

  function handleChange(v) {
    onChange?.(v);
    setOpen(false);
  }

  return (
    <div className="relative w-full" style={{ '--height': `${items * 40}px` }}>
      <button
        type="button"
        className={cx(
          'flex h-10 w-full items-center justify-between bg-white px-3 shadow',
          open ? 'rounded-t' : 'rounded',
        )}
        onClick={handleClick}
      >
        <span>{selected?.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      <ul
        className={cx(
          'absolute h-[var(--height)] w-full origin-top overflow-hidden rounded-b bg-white shadow transition-transform',
          open ? 'scale-y-100' : 'scale-y-0',
        )}
      >
        {items.map((item) => (
          <li key={item.value} className="contents">
            <button
              type="button"
              className={cx(
                'flex h-[40px] w-full items-center px-3',
                selected.value === item.value && 'bg-primary/10 text-primary',
                selected.value !== item.value && 'hover:bg-secondary/[0.08]',
              )}
              onClick={() => handleChange(item.value)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
