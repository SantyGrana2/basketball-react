
function PlayerRow({
  player,
  isFavorite,
  onToggleFavorite
}) {
  return (
    <tr className="player-table__row">
      <td>{player.number}</td>
      <td>{player.name}</td>
      <td>{player.team}</td>
      <td>{player.position}</td>
      <td>{player.age}</td>
      <td>{player.goals}</td>

      <td>
        <button
          type="button"
          className={
            isFavorite
              ? "favorite-button favorite-button--active"
              : "favorite-button"
          }
          onClick={() => onToggleFavorite(player.id)}
          aria-label={
            isFavorite
              ? `Quitar a ${player.name} de favoritos`
              : `Agregar a ${player.name} a favoritos`
          }
          aria-pressed={isFavorite}
          title={
            isFavorite
              ? "Quitar de favoritos"
              : "Agregar a favoritos"
          }
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </td>
    </tr>
  );
}

export default PlayerRow;
