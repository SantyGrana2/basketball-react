
function SearchHistory({
  history,
  onSelectSearch,
  onClearHistory
}) {
  return (
    <section className="search-history">
      <div className="search-history__header">
        <h2 className="search-history__title">
          Búsquedas recientes
        </h2>

        {history.length > 0 && (
          <button
            type="button"
            className="search-history__clear"
            onClick={onClearHistory}
          >
            Limpiar historial
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="search-history__empty">
          Todavía no has realizado búsquedas.
        </p>
      ) : (
        <div className="search-history__list">
          {history.map((term) => (
            <button
              key={term.toLocaleLowerCase("es")}
              type="button"
              className="search-history__item"
              onClick={() => onSelectSearch(term)}
              title={`Buscar ${term}`}
            >
              <span aria-hidden="true">↺</span>
              <span>{term}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchHistory;
