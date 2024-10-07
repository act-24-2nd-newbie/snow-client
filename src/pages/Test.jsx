import Header from '@/components/Header';
import { useState } from 'react';

/**
 * @typedef Item
 * @prop {number} id
 * @prop {string} contents
 * @prop {""} [added]
 *
 */
export default function Test() {
  /** @type {ReturnType<typeof useState<Item[]>>} */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleAddClick() {
    setLoading(true);
    const newId = Math.floor(Math.random() * 10000000);
    setItems([...items, { id: newId, contents: `${newId}` }]);
    setTimeout(() => {
      setItems((is) => is.map((item) => ({ ...item, added: '' })));
      setLoading(false);
    }, 0);
  }

  function handleRemoveClick() {
    setLoading(true);
    setItems(items.map((item, idx) => ({ ...item, added: idx === items.length - 1 ? undefined : '' })));
    setTimeout(() => {
      setItems((is) => is.toSpliced(-1, 1));
      setLoading(false);
    }, 150);
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1280px]">
        <h1>Test!!</h1>
        <button
          type="button"
          className="rounded border px-3 py-1.5 disabled:pointer-events-none disabled:opacity-60"
          onClick={handleAddClick}
          disabled={loading}
        >
          ADD
        </button>
        <button
          type="button"
          className="rounded border px-3 py-1.5 disabled:pointer-events-none disabled:opacity-60"
          onClick={handleRemoveClick}
          disabled={loading}
        >
          REMOVE
        </button>
        <ul>
          {items.map(({ id, contents, added }) => (
            <li key={id} className="opacity-0 transition-opacity data-[added]:opacity-100" data-added={added}>
              {contents}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
