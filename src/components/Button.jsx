/**
 * @typedef {import('react').ButtonHTMLAttributes<HTMLButtonElement>} DefaultButtonProps
 */

import { cva } from 'class-variance-authority';

const button = cva('rounded px-3 py-1.5 transition-colors', {
  variants: {
    variant: {
      ghost: 'border border-transparent hover:bg-black/[.08] disabled:pointer-events-none disabled:text-black/20',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

/**
 * @param {{variant: string} & Pick<DefaultButtonProps, 'children' | 'disabled' | 'onClick'>} param0
 * @returns
 */
export default function Button({ variant, disabled, children, onClick }) {
  return (
    <button type="button" className={button({ variant })} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
