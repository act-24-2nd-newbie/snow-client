import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import TextField from '@/components/TextField';
import EmptyTasks from '@/components/EmptyTasks';
import { createTask, getTasks } from '@/services/task';
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
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSend() {
    if (newTask.trim()) {
      try {
        await createTask({ contents: newTask });
        setNewTask('');
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function handleCheckClick() {}

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
          {!tasks.length ? <EmptyTasks /> : <Tasks tasks={tasks} onCheckClick={handleCheckClick} />}
        </div>
      </main>
    </>
  );
}
