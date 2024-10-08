import { cx } from 'class-variance-authority';
import { Apple } from 'lucide-react';

/**
 * @typedef GrowProps
 * @prop {number} [show]
 *
 * @param {GrowProps} param0
 */
export default function Grow({ show }) {
  return (
    <div
      className={cx('w-10 overflow-hidden transition-[height]', {
        'h-0': show === 0,
        'h-10 origin-top': show === 1,
        'h-0 origin-bottom': show === 2,
      })}
    >
      <Apple className="h-10 w-10" />
    </div>
  );
}
