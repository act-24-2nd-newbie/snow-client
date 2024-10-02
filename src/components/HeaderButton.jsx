/**
 * HeaderButton
 *
 * @typedef HeaderButtonProps
 * @prop {import("react").ReactNode} children
 * @prop {import("react").MouseEventHandler} [onClick]
 *
 * @param {HeaderButtonProps} param0
 */
export default function HeaderButton({ children, onClick }) {
  return (
    <button type="button" className="rounded border px-3 py-1.5 text-sm text-white" onClick={onClick}>
      {children}
    </button>
  );
}
