import { cva } from 'class-variance-authority';

const button = cva('rounded px-3 transition-colors disabled:pointer-events-none flex items-center justify-center', {
  variants: {
    variant: {
      primary: 'border border-transparent bg-primary text-white disabled:bg-primary/30 hover:bg-primary-hover',
      secondary: 'border text-black/60 border border-black/30 hover:bg-black/[0.08] disabled:text-black/20',
      ghost: 'border border-transparent hover:bg-black/[.08] disabled:text-black/20',
    },
    size: {
      md: 'h-9 min-w-[90px]',
      sm: 'h-8 min-w-[69px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
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
export default function Button({ variant, size, disabled, children, onClick }) {
  return (
    <button type="button" className={button({ variant, size })} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
