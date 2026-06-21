export default function Editor({
  code,
  setCode,
}) {
  const lineNumbers = code
    ? code.split("\n").length
    : 1;

  return (
    <div className="editor-section">
      <h2>main.mini</h2>

      <div className="editor-wrapper">
        <div className="line-numbers">
          {Array.from(
            { length: lineNumbers },
            (_, i) => (
              <div key={i}>
                {i + 1}
              </div>
            )
          )}
        </div>

        <textarea
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          placeholder="Write some code, e.g.
          
let x = 5;
let y = x + 10;
print(y);"
        />
      </div>
    </div>
  );
}