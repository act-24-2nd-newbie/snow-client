import { cva } from 'class-variance-authority';

const button = cva('rounded px-3 py-1.5 transition-colors disabled:pointer-events-none', {
  variants: {
    variant: {
      primary: 'border border-transparent bg-primary text-white disabled:bg-primary/30 hover:bg-primary-hover',
      secondary: 'border text-black/60 border border-black/30 hover:bg-black/[0.08] disabled:text-black/20',
      ghost: 'border border-transparent hover:bg-black/[.08] disabled:text-black/20',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

/**
 * Button component
 *
 * @typedef {import('react').ButtonHTMLAttributes<HTMLButtonElement>} ReactButtonAttributes
 * @typedef {import('class-variance-authority').VariantProps<typeof button> &
 * Pick<ReactButtonAttributes, 'children' | 'disabled' | 'onClick'>} ButtonProps
 *
 * @param {ButtonProps} param0
 */
export default function Button({ variant, disabled, children, onClick }) {
  return (
    <button type="button" className={button({ variant })} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
