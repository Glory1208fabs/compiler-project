export default function TokenTable({
  tokens,
}) {
  if (!tokens.length) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        {"{ }"}
      </div>

      <p>
        Write some code and click{" "}
        <strong>Analyse</strong> to see
        the tokens.
      </p>
    </div>
  );
}

  return (
    <>
      <div className="token-header">
        {tokens.length} token
        {tokens.length !== 1 ? "s" : ""}
        {" "}found
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Lexeme</th>
            <th>Token Type</th>
            <th>Line</th>
            <th>Column</th>
          </tr>
        </thead>

        <tbody>
          {tokens.map(
            (token, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {token.lexeme || "EOF"}
                </td>
                <td>{token.type}</td>
                <td>{token.line}</td>
                <td>{token.column}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}