import { cx } from 'class-variance-authority';

import box from '@/assets/ic_checkbox.svg';
import checkedBox from '@/assets/ic_checkbox_checked.svg';

/**
 * Checkbox component
 *
 * @typedef {object} CheckboxProps
 * @prop {boolean} [checked]
 * @prop {(checked: boolean) => void} [onClick]
 *
 * @param {CheckboxProps} param0
 */
export default function Checkbox({ checked, onClick }) {
  /** @param {import('react').MouseEvent<HTMLButtonElement>} e  */
  function handleClick(e) {
    e.stopPropagation();
    onClick?.(!checked);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(['shrink-0 rounded-full', checked ? 'hover:bg-primary/10' : 'hover:bg-secondary/10'])}
    >
      {checked ? (
        <img src={checkedBox} alt="checked checkbox" width={28} height={28} />
      ) : (
        <img src={box} alt="checkbox" width={28} height={28} />
      )}
    </button>
  );
}
