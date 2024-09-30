import { cx } from 'class-variance-authority';
import { Trash2 } from 'lucide-react';

import { getDateString } from '@/utils/dateUtil';
import Checkbox from './Checkbox';
import TextField from './TextField';
import { useEffect, useRef } from 'react';

/** @typedef {Task & {changedContents?: string}} TaskWithChange */

/**
 * TaskItem
 * @param {{
 * task: TaskWithChange;
 * selected: boolean;
 * onCheckClick?: () => void;
 * onDeleteClick?: () => void;
 * onClick?: () => void;
 * onChange?: (value) => void;
 * onSend?: () => void;
 * }} param0
 * @returns
 */
function TaskItem({ task, selected, onCheckClick, onDeleteClick, onClick, onChange, onSend }) {
  function handleWrapperClick(e) {
    e.stopPropagation();
    onClick?.();
  }

  /** @param {import('react').MouseEvent<HTMLButtonElement>} e  */
  function handleDeleteClick(e) {
    e.stopPropagation();
    onDeleteClick?.();
  }

  if (selected) {
    return (
      <li className="contents">
        <TextField
          border={true}
          value={task.changedContents ?? task.contents}
          selected={selected}
          onChange={onChange}
          onSend={onSend}
        />
      </li>
    );
  } else {
    return (
      <li className="flex h-[60px] items-center gap-3 rounded bg-white px-4" onClick={handleWrapperClick} role="button">
        <Checkbox checked={task.isDone} onClick={onCheckClick} />
        <span className={cx(['grow font-medium', task.isDone && 'line-through opacity-60'])}>{task.contents}</span>
        <span className="text-xs opacity-60">
          Created: {getDateString(task.createdAt)}
          {task.createdAt !== task.modifiedAt && ` (Modified: ${getDateString(task.modifiedAt)})`}
        </span>
        <button
          type="buton"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 hover:bg-red-700"
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-4 w-4 text-white" />
        </button>
      </li>
    );
  }
}

/**
 * Tasks
 * @param {{
 * tasks: (TaskWithChange & {selected: boolean})[],
 * onCheckClick?: (id: number, checked: boolean) => void;
 * onDeleteClick?: (id: number) => void;
 * onItemClick?: (id: number) => void;
 * onItemChange?: (id: number, value: string) => void;
 * onSend?: (id: number) => void;
 * onClear?: () => void;
 * }} param0
 * @returns
 */
export default function Tasks({ tasks, onCheckClick, onDeleteClick, onItemClick, onItemChange, onSend, onClear }) {
  /** @type {ReturnType<typeof useRef<HTMLDivElement>>} */
  const ref = useRef(null);

  useEffect(() => {
    /** @param {import('react').MouseEvent<HTMLDivElement>} e */
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClear?.();
      }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClear]);

  return (
    <div className="overflow-y mx-auto w-full max-w-[1280px] px-[52px]" ref={ref}>
      <ul className="mt-4 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            selected={task.selected}
            onCheckClick={(checked) => onCheckClick?.(task.id, checked)}
            onClick={() => onItemClick?.(task.id)}
            onDeleteClick={() => onDeleteClick?.(task.id)}
            onChange={(value) => onItemChange?.(task.id, value)}
            onSend={() => onSend?.(task.id)}
            onClear={onClear}
          />
        ))}
      </ul>
    </div>
  );
}
