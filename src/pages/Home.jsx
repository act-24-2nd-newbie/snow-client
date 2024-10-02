import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import EmptyTasks from '@/components/EmptyTasks';
import Header from '@/components/Header';
import Tasks from '@/components/Tasks';
import TextField from '@/components/TextField';
import { createTask, deleteTask, deleteTasks, getTasks, updateTask } from '@/services/task';
import Dropdown from '@/components/Drowdown';

/** @satisfies {DropdownItem[]} */
const SORT_ORDER = [
  { label: 'Oldest', value: '1' },
  { label: 'Latest', value: '2' },
];

export default function Home() {
  /** @type {ReturnType<typeof useState<ExtendedTask[]>>} */
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [sortOrder, setSortOrder] = useState(SORT_ORDER[0].value);

  const name = sessionStorage.getItem('name');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const items = await getTasks();
      setTasks(items.map((item) => ({ ...item, selected: false })));
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSend() {
    if (newTask.trim()) {
      try {
        await createTask({ contents: newTask });
        setNewTask('');
        fetchData();
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * @param {number} id
   * @param {boolean} checked
   */
  async function handleCheckClick(id, checked) {
    await updateTask(id, { isDone: checked });
    fetchData();
  }

  /** @param {number} id  */
  async function handleDeleteClick(id) {
    await deleteTask(id);
    fetchData();
  }

  /** @param {number} id */
  function handleClick(id) {
    setTasks(
      tasks.map((item) => ({
        ...item,
        selected: !item.isDone && item.id === id,
      })),
    );
  }

  /**
   * @param {number} id
   * @param {string} value
   */
  function handleChange(id, value) {
    setTasks(
      tasks.map((item) => ({
        ...item,
        changedContents: item.id === id ? value : item.contents,
      })),
    );
  }

  function handleClickedItemClear() {
    setTasks(
      tasks.map((items) => ({
        ...items,
        selected: false,
        changedContents: undefined,
      })),
    );
  }

  /** @param {number} id  */
  async function handleTaskSend(id) {
    const target = tasks.filter((item) => item.id === id)[0];
    if (target) {
      if (target.changedContents && target.contents !== target.changedContents) {
        await updateTask(id, { contents: target.changedContents });
        fetchData();
      }
    }
  }

  async function handleDeleteAllClick() {
    await deleteTasks();
    setTasks([]);
  }

  /** @param {string} v */
  function handleDropdownChange(v) {
    setSortOrder(v);
    if (v === '1') {
      setTasks(tasks.toSorted((a, b) => a.createdAt - b.createdAt));
    } else {
      setTasks(tasks.toSorted((a, b) => b.createdAt - a.createdAt));
    }
  }

  return (
    <>
      <Header />
      <main className="flex h-full grow flex-col overflow-hidden">
        {/* Top */}
        <div className="mx-auto w-full max-w-[1280px] shrink-0">
          <div className="ml-[60px]">
            <p className="mt-6 text-2xl text-welcome-foreground">Good afternoon, {name}.</p>
            <p className="mt-4 text-2xl text-welcome-foreground">You’ve got</p>
            <p className="text-[48px] font-bold text-welcome-foreground">2 / 2</p>
            <p className="text-2xl text-welcome-foreground">task(s) Today!</p>
          </div>
          <div className="mx-[60px] mb-6 mt-4">
            <TextField
              placeholder="Enter your task"
              maxLength={100}
              value={newTask}
              onChange={setNewTask}
              onSend={handleSend}
            />
          </div>
        </div>
        {/* Tasks Wrapper */}
        <div className="flex h-full grow flex-col overflow-y-auto bg-tasks py-6">
          <div className="mx-auto flex w-full max-w-[1280px] justify-between px-[52px]">
            <div className="w-[120px]">
              <Dropdown items={SORT_ORDER} value={sortOrder} onChange={handleDropdownChange} />
            </div>
            <Button variant="ghost" disabled={!tasks.length} onClick={handleDeleteAllClick}>
              Clear All
            </Button>
          </div>
          {!tasks.length ? (
            <EmptyTasks />
          ) : (
            <Tasks
              tasks={tasks}
              onCheckClick={handleCheckClick}
              onDeleteClick={handleDeleteClick}
              onItemClick={handleClick}
              onItemChange={handleChange}
              onSend={handleTaskSend}
              onClear={handleClickedItemClear}
            />
          )}
        </div>
      </main>
    </>
  );
}
