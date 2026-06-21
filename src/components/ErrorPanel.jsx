export default function ErrorPanel({
  error,
}) {
  if (!error) return null;

  return (
    <div className="error-panel">
      {error}
    </div>
  );
}