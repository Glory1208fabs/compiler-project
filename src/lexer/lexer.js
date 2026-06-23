const KEYWORDS = new Set([
  "print",
  "if",
  "else",
  "elif",
  "for",
  "while",
  "def",
  "return",
  "class",
  "import",
  "from",
  "as",
  "try",
  "except",
  "finally",
  "with",
  "pass",
  "break",
  "continue",
  "True",
  "False",
  "None",
  "and",
  "or",
  "not",
  "in",
  "is"
]);

const SYMBOLS = {
  "=": "ASSIGN",
  "+": "PLUS",
  "-": "MINUS",
  "*": "STAR",
  "/": "SLASH",
  "%": "MODULO",
  "(": "LPAREN",
  ")": "RPAREN",
  ":": "COLON",
  ",": "COMMA",
  ".": "DOT",
  "[": "LBRACKET",
  "]": "RBRACKET",
  "{": "LBRACE",
  "}": "RBRACE",
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

  if (c === '"' || c === "'") {
    const quote = c;
    const startCol = col;

      i++;
     col++;

    const start = i;

  while (
    i < source.length &&
    source[i] !== quote
  ) {
    i++;
    col++;
  }

  if (i >= source.length) {
    throw new LexError(
      "Unterminated string",
      line,
      startCol
    );
  }

  const value = source.slice(start, i);

  tokens.push({
    type: "STRING",
    lexeme: value,
    line,
    column: startCol,
  });

  i++;
  col++;

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