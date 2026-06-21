const KEYWORDS = new Set(["let", "print"]);

const SYMBOLS = {
  "=": "ASSIGN",
  "+": "PLUS",
  "-": "MINUS",
  "*": "STAR",
  "/": "SLASH",
  "(": "LPAREN",
  ")": "RPAREN",
  ";": "SEMICOLON",
};

export class LexError extends Error {
  constructor(message, line, column) {
    super(message);
    this.line = line;
    this.column = column;
  }
}

export function tokenize(source) {
  const tokens = [];

  let i = 0;
  let line = 1;
  let col = 1;

  const isDigit = (c) => c >= "0" && c <= "9";
  const isAlpha = (c) => /[A-Za-z_]/.test(c);
  const isAlphaNum = (c) => isAlpha(c) || isDigit(c);

  while (i < source.length) {
    const c = source[i];

    if (c === "\n") {
      line++;
      col = 1;
      i++;
      continue;
    }

    if (c === " " || c === "\t" || c === "\r") {
      i++;
      col++;
      continue;
    }

    if (isDigit(c)) {
      const start = i;
      const startCol = col;

      while (i < source.length && isDigit(source[i])) {
        i++;
        col++;
      }

      tokens.push({
        type: "NUMBER",
        lexeme: source.slice(start, i),
        line,
        column: startCol,
      });

      continue;
    }

    if (isAlpha(c)) {
      const start = i;
      const startCol = col;

      while (i < source.length && isAlphaNum(source[i])) {
        i++;
        col++;
      }

      const word = source.slice(start, i);

      tokens.push({
        type: KEYWORDS.has(word)
          ? "KEYWORD"
          : "IDENTIFIER",
        lexeme: word,
        line,
        column: startCol,
      });

      continue;
    }

    if (SYMBOLS[c]) {
      tokens.push({
        type: SYMBOLS[c],
        lexeme: c,
        line,
        column: col,
      });

      i++;
      col++;
      continue;
    }

    throw new LexError(
      `Unexpected character '${c}'`,
      line,
      col
    );
  }

  tokens.push({
    type: "EOF",
    lexeme: "",
    line,
    column: col,
  });

  return tokens;
}