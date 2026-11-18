
function FavoritesFilter({
  favoritesCount,
  showOnlyFavorites,
  onToggleFilter
}) {
  return (
    <section className="favorites-filter">
      <div className="favorites-filter__info">
        <span
          className="favorites-filter__icon"
          aria-hidden="true"
        >
          ★
        </span>

        <div className="favorites-filter__text">
          <strong>Mis jugadores favoritos</strong>
          <span>
            {favoritesCount === 1
              ? "1 jugador guardado"
              : `${favoritesCount} jugadores guardados`}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={`favorites-filter__button ${
          showOnlyFavorites
            ? "favorites-filter__button--active"
            : ""
        }`}
        onClick={onToggleFilter}
        aria-pressed={showOnlyFavorites}
      >
        <span aria-hidden="true">
          {showOnlyFavorites ? "✓" : "☆"}
        </span>

        {showOnlyFavorites
          ? "Mostrar todos"
          : "Solo favoritos"}
      </button>
    </section>
  );
}

export default FavoritesFilter;
