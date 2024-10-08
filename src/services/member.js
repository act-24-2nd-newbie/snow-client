const SERVER_URL = import.meta.env.VITE_SERVER_URL;

/**
 * checkEmail
 * @param {string} email
 * @returns {Promise<{ exists?: boolean; ok: boolean }>}
 */
export async function checkEmail(email) {
  const res = await fetch(`${SERVER_URL}/members/check`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (res.ok) {
    const json = { ...(await res.json()), ok: true };
    return json;
  }
  return res;
}

/**
 * registerMember
 * @param {string} email
 * @param {string} userName
 */
export async function registerMember(email, userName) {
  return await fetch(`${SERVER_URL}/members`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, userName }),
  });
}
