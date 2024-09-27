import { useState } from 'react';

import Header from '@/components/Header';
import TextField from '@/components/TextField';
import EmptyTasks from '@/components/EmptyTasks';
import { createTask } from '@/services/task';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const name = sessionStorage.getItem('name');

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

  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        {/* Top */}
        <div className="mx-auto w-full max-w-[1280px] shrink-0">
          <div className="ml-[60px]">
            <p className="text-welcome-foreground mt-6 text-2xl">Good afternoon, {name}.</p>
            <p className="text-welcome-foreground mt-4 text-2xl">You’ve got</p>
            <p className="text-welcome-foreground text-[48px] font-bold">2 / 2</p>
            <p className="text-welcome-foreground text-2xl">task(s) Today!</p>
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
        <div className="bg-tasks grow">{!tasks.length ? <EmptyTasks /> : <></>}</div>
      </main>
    </>
  );
}
