const SERVER_URL = import.meta.env.VITE_SERVER_URL;

/**
 * createTask
 * @param {{contents: string}} data
 */
export async function createTask(data) {
  return await fetch(`${SERVER_URL}/tasks`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * getTasks
 * @returns {Promise<{
 * id: number;
 * contents: string;
 * isDone: boolean;
 * createdAt: number;
 * modifiedAt: number;
 * }[]>}
 */
export async function getTasks() {
  const res = await fetch(`${SERVER_URL}/tasks`, {
    method: 'get',
  });
  return await res.json();
}

/**
 * updateTask
 * @param {number} id
 * @param {{
 * contents?: string;
 * isDone?: boolean;
 * }} param1
 */
export async function updateTask(id, { contents, isDone }) {
  return await fetch(`${SERVER_URL}/tasks/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contents, isDone }),
  });
}
