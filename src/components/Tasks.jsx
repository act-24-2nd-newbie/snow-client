import { Trash2 } from 'lucide-react';
import Checkbox from './Checkbox';
import { getDateString } from '@/utils/dateUtil';
import { cx } from 'class-variance-authority';

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
 * @param {{ task: Task, onCheckClick: (id: number) => void; }} param0
 * @returns
 */
function TaskItem({ task, onCheckClick }) {
  return (
    <li className="flex h-[60px] items-center gap-3 rounded bg-white px-4">
      <Checkbox checked={task.isDone} onClick={() => onCheckClick(task.id)} />
      <span className={cx(['grow font-medium', task.isDone && 'line-through opacity-60'])}>{task.contents}</span>
      <span className="text-xs opacity-60">
        Created: {getDateString(task.createdAt)}
        {task.createdAt !== task.modifiedAt && ` (Modified: ${getDateString(task.modifiedAt)}`}
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

/**
 * Tasks
 * @param {{ tasks: Task[], onCheckClick: (id: number) => void; }} param0
 * @returns
 */
export default function Tasks({ tasks, onCheckClick }) {
  return (
    <div className="overflow-y mx-auto w-full max-w-[1280px] px-[52px]">
      <ul className="mt-4 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onCheckClick={onCheckClick} />
        ))}
      </ul>
    </div>
  );
}
