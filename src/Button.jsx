function ErrorMsg() {
  return <div></div>;
}

export default function Button(props) {
  const a = props.id;
  const message = {};
  return (
    <div>
      <button type="button" tabIndex={1}>
        {a}
      </button>
      <ErrorMsg>{message}</ErrorMsg>
    </div>
  );
}
