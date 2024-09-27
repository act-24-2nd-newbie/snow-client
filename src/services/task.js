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
