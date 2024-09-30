import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import TextField from '@/components/TextField';
import EmptyTasks from '@/components/EmptyTasks';
import { createTask, deleteTask, getTasks, updateTask } from '@/services/task';
import Tasks from '@/components/Tasks';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

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

  return (
    <>
      <Header />
      <main className="flex grow flex-col">
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
        <div className="grow bg-tasks">
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
