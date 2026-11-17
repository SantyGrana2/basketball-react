
function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar jugador por nombre..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar jugador"
      />

      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={onClear}
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

export default SearchBar;
