
import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import SearchBar from "./components/SearchBar";
import PlayerTable from "./components/PlayerTable";
import Pagination from "./components/Pagination";
import StatsPanel from "./components/StatsPanel";

import { players } from "./data/players";

function App() {
  // Estados de búsqueda
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Estado de ordenamiento
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null
  });

  // Debounce de búsqueda de 300 ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Filtrar jugadores por nombre
  const filteredPlayers = useMemo(() => {
    return players.filter((player) =>
      player.name
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase())
    );
  }, [debouncedSearch]);

  // Ordenar jugadores
  const sortedPlayers = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return filteredPlayers;
    }

    return [...filteredPlayers].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      
    const comparison =
      typeof valueA === "number" &&
      typeof valueB === "number"
        ? valueA - valueB
        : String(valueA).localeCompare(
            String(valueB),
            "es",
            { sensitivity: "base" }
          );

      return sortConfig.direction === "asc"
        ? comparison
        : -comparison;
    });
  }, [filteredPlayers, sortConfig]);

  // Calcular el total de páginas
  const totalPages = Math.ceil(
    sortedPlayers.length / pageSize
  );

  // Garantizar una página válida
  const safePage = Math.max(
    1,
    Math.min(currentPage, totalPages || 1)
  );

  // Obtener jugadores de la página actual
  const startIndex = (safePage - 1) * pageSize;

  const paginatedPlayers = sortedPlayers.slice(
    startIndex,
    startIndex + pageSize
  );

  // Cambiar búsqueda
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Limpiar búsqueda
  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  // Cambiar cantidad de jugadores por página
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Ordenamiento de tres estados
  const handleSort = (key) => {
    setSortConfig((previous) => {
      if (previous.key !== key) {
        return { key, direction: "asc" };
      }

      if (previous.direction === "asc") {
        return { key, direction: "desc" };
      }

      return { key: null, direction: null };
    });

    setCurrentPage(1);
  };

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Scoreboard />

        <SearchBar
          value={search}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />

        <StatsPanel players={filteredPlayers} />

        <p className="app__results">
          Resultados encontrados: {filteredPlayers.length}
        </p>

        <PlayerTable
          players={paginatedPlayers}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </main>
    </div>
  );
}

export default App;
