
import { useMemo } from "react";

function StatsPanel({ players }) {
  const stats = useMemo(() => {
    const total = players.length;

    if (total === 0) {
      return {
        total: 0,
        average: 0,
        topScorer: null,
        positions: []
      };
    }

    // Sumar las anotaciones de los jugadores
    const totalGoals = players.reduce(
      (sum, player) => sum + player.goals,
      0
    );

    // Calcular promedio
    const average = totalGoals / total;

    // Encontrar el máximo anotador
    const topScorer = players.reduce(
      (best, player) =>
        player.goals > best.goals ? player : best
    );

    // Contar jugadores por posición
    const positionCounts = players.reduce(
      (counts, player) => {
        counts[player.position] =
          (counts[player.position] || 0) + 1;

        return counts;
      },
      {}
    );

    // Convertir el conteo en porcentajes
    const positions = Object.entries(
      positionCounts
    ).map(([name, count]) => ({
      name,
      count,
      percentage: (count / total) * 100
    }));

    return {
      total,
      average,
      topScorer,
      positions
    };
  }, [players]);

  return (
    <section className="stats-panel">
      <h2>Estadísticas de Basketball</h2>

      <div className="stats-panel__cards">
        <article className="stats-panel__card">
          <h3>Total de jugadores</h3>
          <p>{stats.total}</p>
        </article>

        <article className="stats-panel__card">
          <h3>Promedio de anotaciones</h3>
          <p>{stats.average.toFixed(1)}</p>
        </article>

        <article className="stats-panel__card">
          <h3>Máximo anotador</h3>
          <p>
            {stats.topScorer
              ? stats.topScorer.name
              : "Sin resultados"}
          </p>
          {stats.topScorer && (
            <span>
              {stats.topScorer.goals} anotaciones
            </span>
          )}
        </article>

        <article className="stats-panel__card">
          <h3>Posiciones diferentes</h3>
          <p>{stats.positions.length}</p>
        </article>
      </div>

      <div className="stats-panel__distribution">
        <h3>Distribución por posiciones</h3>

        {stats.positions.length === 0 ? (
          <p>No hay datos para mostrar.</p>
        ) : (
          stats.positions.map((position) => (
            <div
              className="stats-panel__position"
              key={position.name}
            >
              <div className="stats-panel__position-info">
                <span>{position.name}</span>
                <span>
                  {position.count} (
                  {position.percentage.toFixed(0)}%)
                </span>
              </div>

              <div className="stats-panel__bar">
                <div
                  className="stats-panel__bar-fill"
                  style={{
                    width: `${position.percentage}%`
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default StatsPanel;
