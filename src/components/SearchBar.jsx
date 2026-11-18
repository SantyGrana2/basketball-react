
function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar">
      <label
        className="search-bar__label"
        htmlFor="player-search"
      >
        Buscar jugador
      </label>

      <div className="search-bar__control">
        <svg
          className="search-bar__icon"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          id="player-search"
          type="search"
          className="search-bar__input"
          placeholder="Buscar jugador por nombre..."
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          autoComplete="off"
        />

        {value && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
          >
            Limpiar
            <span aria-hidden="true"> ×</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
