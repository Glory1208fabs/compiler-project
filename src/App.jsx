import { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import TokenTable from "./components/TokenTable";
import ErrorPanel from "./components/ErrorPanel";

import {
  tokenize,
  LexError,
} from "./lexer/lexer";

import "./App.css";

export default function App() {
  const [code, setCode] = useState("");

  const [tokens, setTokens] =
    useState([]);

  const [error, setError] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(false);

  function handleAnalyse() {
    try {
      const result =
        tokenize(code);

      setTokens(result);
      setError("");
    } catch (err) {
      if (err instanceof LexError) {
        setError(
          `Lexical Error: ${err.message} (Line ${err.line}, Column ${err.column})`
        );

        setTokens([]);
      }
    }
  }

 function handleClear() {
  setCode("");
  setTokens([]);
  setError("");
}

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        tokenCount={tokens.length}
      />

      <main className="layout">
        <section>
          <Editor
            code={code}
            setCode={setCode}
          />

          <div className="buttons">
            <button onClick={handleClear}>
              Clear
            </button>
 
            <button
              onClick={
                handleAnalyse
              }
            >
              Analyse
            </button>
          </div>

          <ErrorPanel
            error={error}
          />
        </section>

        <section>
          <TokenTable
            tokens={tokens}
          />
        </section>
      </main>
    </div>
  );
}