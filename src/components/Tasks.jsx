import { cx } from 'class-variance-authority';
import { Trash2 } from 'lucide-react';

import { getDateString } from '@/utils/dateUtil';
import Checkbox from './Checkbox';
import TextField from './TextField';
import { useEffect, useRef } from 'react';

/**
 * TaskItem
 *
 * @typedef {object} TaskItemProps
 * @prop {Task & { changedContents?: string }} task
 * @prop {boolean} selected
 * @prop {(checked: boolean) => void} [onCheckClick]
 * @prop {() => void} [onDeleteClick]
 * @prop {() => void} [onClick]
 * @prop {(value: string) => void} [onChange]
 * @prop {() => void} [onSend]
 *
 * @param {TaskItemProps} param0
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
      <li
        className="flex h-[60px] cursor-pointer items-center gap-3 rounded bg-white px-4"
        onClick={handleWrapperClick}
      >
        <Checkbox checked={task.isDone} onClick={onCheckClick} />
        <span
          className={cx([
            'max-w-full grow overflow-hidden overflow-ellipsis text-nowrap font-medium',
            task.isDone && 'line-through opacity-60',
          ])}
          title={task.contents}
        >
          {task.contents}
        </span>
        <span className="shrink-0 text-xs opacity-60">
          Created: {getDateString(task.createdAt)}
          {task.createdAt !== task.modifiedAt && ` (Modified: ${getDateString(task.modifiedAt)})`}
        </span>
        <button
          type="button"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 hover:bg-red-700"
          onClick={handleDeleteClick}
          title="delete"
        >
          <Trash2 className="h-4 w-4 text-white" />
        </button>
      </li>
    );
  }
}

/**
 * Tasks
 *
 * @typedef {Object} TasksProps
 * @prop {ExtendedTask[]} tasks
 * @prop {(id: number, checked: boolean) => void} [onCheckClick]
 * @prop {(id: number) => void} [onDeleteClick]
 * @prop {(id: number) => void} [onItemClick]
 * @prop {(id: number, value: string) => void} [onItemChange]
 * @prop {(id: number) => void} [onSend]
 * @prop {() => void} [onClear]
 *
 * @param {TasksProps} param0
 */
export default function Tasks({ tasks, onCheckClick, onDeleteClick, onItemClick, onItemChange, onSend, onClear }) {
  /** @type {ReturnType<typeof useRef<HTMLDivElement>>} */
  const ref = useRef(null);

  useEffect(() => {
    /** @param {MouseEvent} e */
    function handleOutsideClick(e) {
      // @ts-ignore
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
    <div className="mx-auto w-full max-w-[1280px] px-[52px] py-4" ref={ref}>
      <ul className="flex flex-col gap-2">
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
          />
        ))}
      </ul>
    </div>
  );
}
