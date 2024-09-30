import { cx } from 'class-variance-authority';
import box from '@/assets/ic_checkbox.svg';
import checkedBox from '@/assets/ic_checkbox_checked.svg';

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
      className={cx(['rounded-full', checked ? 'hover:bg-primary/10' : 'hover:bg-secondary/10'])}
    >
      {checked ? (
        <img src={checkedBox} alt="checked checkbox" width={28} height={28} />
      ) : (
        <img src={box} alt="checkbox" width={28} height={28} />
      )}
    </button>
  );
}
