export default function Header({
  darkMode,
  setDarkMode,
  tokenCount,
}) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Mini Compiler Visualizer</h1>
      </div>

      <div className="header-right">
        <div className="token-count">
          <span className="dot"></span>
          <span>{tokenCount}</span>
          <span>tokens</span>
        </div>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? "  Light" : "   Dark"}
        </button>
      </div>
    </header>
  );
}