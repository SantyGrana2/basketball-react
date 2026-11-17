
function FavoritesFilter({
  favoritesCount,
  showOnlyFavorites,
  onToggleFilter
}) {
  return (
    <div className="favorites-filter">
      <span className="favorites-filter__count">
        ★ Favoritos: {favoritesCount}
      </span>

      <button
        type="button"
        className="favorites-filter__button"
        onClick={onToggleFilter}
        aria-pressed={showOnlyFavorites}
      >
        {showOnlyFavorites
          ? "Mostrar todos"
          : "Solo favoritos"}
      </button>
    </div>
  );
}

export default FavoritesFilter;
