import { Trash2 } from 'lucide-react';
import Checkbox from './Checkbox';
import { getDateString } from '@/utils/dateUtil';
import { cx } from 'class-variance-authority';
import TextField from './TextField';

/**
 * @typedef {{
 * id: number;
 * contents: string;
 * isDone: boolean;
 * createdAt: number;
 * modifiedAt: number;
 * }} Task
 */

/**
 * TaskItem
 * @param {{
 * task: Task,
 * selected: boolean,
 * onCheckClick?: () => void;
 * onClick?: () => void;
 * onChange?: (value) => void;
 * onSend?: () => void;
 * }} param0
 * @returns
 */
function TaskItem({ task, selected, onCheckClick, onClick, onChange, onSend }) {
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
      <li className="flex h-[60px] items-center gap-3 rounded bg-white px-4" onClick={onClick} role="button">
        <Checkbox checked={task.isDone} onClick={onCheckClick} />
        <span className={cx(['grow font-medium', task.isDone && 'line-through opacity-60'])}>{task.contents}</span>
        <span className="text-xs opacity-60">
          Created: {getDateString(task.createdAt)}
          {task.createdAt !== task.modifiedAt && ` (Modified: ${getDateString(task.modifiedAt)})`}
        </span>
        <button
          type="buton"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 hover:bg-red-700"
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
 * tasks: Task[],
 * onCheckClick?: (id: number, checked: boolean) => void;
 * onItemClick?: (id: number) => void;
 * onItemChange?: (id: number, value: string) => void;
 * onSend?: (id: number) => void;
 * }} param0
 * @returns
 */
export default function Tasks({ tasks, onCheckClick, onItemClick, onItemChange, onSend }) {
  return (
    <div className="overflow-y mx-auto w-full max-w-[1280px] px-[52px]">
      <ul className="mt-4 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            selected={task.selected}
            onCheckClick={(checked) => onCheckClick?.(task.id, checked)}
            onClick={() => onItemClick?.(task.id)}
            onChange={(value) => onItemChange?.(task.id, value)}
            onSend={() => onSend?.(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}
