export default function TokenTable({
  tokens,
  error,
}) {
  if (error) {
    return (
      <div className="token-error">
        <div className="error-header">
          <span className="error-icon">
            !
          </span>
          <span>
            Lexical Error
          </span>
        </div>

        <p>{error}</p>
      </div>
    );
  }

  if (!tokens.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          {"{ }"}
        </div>

        <p>
          Write some code and click{" "}
          <strong>Analyse</strong> to
          see the tokens.
        </p>
      </div>
    );
  }

  return (
    <>
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
                  {token.lexeme ||
                    "␀"}
                </td>

                <td>
                  {token.type}
                </td>

                <td>
                  {token.line}
                </td>

                <td>
                  {token.column}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}