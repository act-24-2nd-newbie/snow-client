import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';

import EmptyTasks from '@/components/EmptyTasks';
import Header from '@/components/Header';
import HeaderButton from '@/components/HeaderButton';
import Tasks from '@/components/Tasks';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Drowdown';
import TextField from '@/components/ui/TextField';
import { createTask, deleteTask, deleteTasks, updateTask } from '@/services/task';
import { getWelcomeMessage } from '@/utils/dateUtil';
import { COMPLETE_MESSAGE, CREATE_MESSAGE, DELETE_ALL_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from '@/utils/message';
import { useToast } from '@/utils/toast';

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
  const navigate = useNavigate();
  const loadedTasks = useLoaderData();
  const revalidator = useRevalidator();

  const { addToast } = useToast();

  const id = parseInt(sessionStorage.getItem('id'));
  const name = sessionStorage.getItem('name');

  const sortedTasks = useMemo(() => {
    if (sortOrder === '1') {
      return tasks.toSorted((a, b) => a.createdDate - b.createdDate);
    } else {
      return tasks.toSorted((a, b) => b.createdDate - a.createdDate);
    }
  }, [tasks, sortOrder]);

  const fetchData = useCallback(
    function () {
      revalidator.revalidate();
      setTasks(loadedTasks.map((item) => ({ ...item, selected: false })));
    },
    [revalidator, loadedTasks],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSend() {
    if (newTask.trim()) {
      const res = await createTask({ memberId: id, contents: newTask });
      if (res.ok) {
        addToast(CREATE_MESSAGE);
        setNewTask('');
        fetchData();
      }
    }
  }

  /**
   * @param {number} id
   * @param {boolean} checked
   */
  async function handleCheckClick(id, checked) {
    const res = await updateTask(id, { isDone: checked });
    if (res.ok) {
      if (checked) {
        addToast(COMPLETE_MESSAGE);
      }
      fetchData();
    }
  }

  /** @param {number} id  */
  async function handleDeleteClick(id) {
    const res = await deleteTask(id);
    if (res.ok) {
      addToast(DELETE_MESSAGE);
      fetchData();
    }
  }

  /** @param {number} id */
  function handleClick(id) {
    // get state of clicked item
    const { isDone } = tasks.filter((t) => t.id === id)[0];
    if (!isDone) {
      setTasks(
        tasks.map((item) => ({
          ...item,
          selected: !item.isDone && item.id === id,
        })),
      );
    }
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
        const res = await updateTask(id, { contents: target.changedContents });
        if (res.ok) {
          addToast(UPDATE_MESSAGE);
          fetchData();
        }
      }
    }
  }

  async function handleDeleteAllClick() {
    const res = await deleteTasks();
    if (res.ok) {
      addToast(DELETE_ALL_MESSAGE);
      setTasks([]);
    }
  }

  function handleLogoutClick() {
    sessionStorage.removeItem('name');
    navigate('/');
  }

  /** @param {string} v */
  function handleDropdownChange(v) {
    setSortOrder(v);
  }

  return (
    <>
      <Header rightArea={<HeaderButton onClick={handleLogoutClick}>Logout</HeaderButton>} />
      <main className="flex h-full grow flex-col overflow-hidden">
        {/* Top */}
        <div className="mx-auto w-full max-w-[1280px] shrink-0">
          <div className="ml-[60px]">
            <p className="mt-6 text-2xl text-welcome-foreground">
              {getWelcomeMessage()}, {name}.
            </p>
            <p className="mt-4 text-2xl text-welcome-foreground">You’ve got</p>
            <p className="text-[48px] font-bold text-welcome-foreground">
              {tasks.filter((t) => !t.isDone).length} / {tasks.length}
            </p>
            <p className="text-2xl text-welcome-foreground">task(s) Today!</p>
          </div>
          <div className="mx-[60px] mb-6 mt-4">
            <TextField placeholder="Enter your task" value={newTask} onChange={setNewTask} onSend={handleSend} />
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
              tasks={sortedTasks}
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
