
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import SearchBar from "./components/SearchBar";
import PlayerTable from "./components/PlayerTable";
import Pagination from "./components/Pagination";

import { players } from "./data/players";

function App() {
  // Estado de la búsqueda
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Estado de la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Espera de 300 ms antes de buscar
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Filtrar jugadores por nombre
  const filteredPlayers = players.filter((player) =>
    player.name
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase())
  );

  // Calcular el número de páginas
  const totalPages = Math.ceil(
    filteredPlayers.length / pageSize
  );

  // Evitar páginas fuera del rango válido
  const safePage = Math.max(
    1,
    Math.min(currentPage, totalPages || 1)
  );

  // Obtener solo los jugadores de la página actual
  const startIndex = (safePage - 1) * pageSize;

  const paginatedPlayers = filteredPlayers.slice(
    startIndex,
    startIndex + pageSize
  );

  // Reiniciar a la primera página al buscar
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Cambiar cantidad de jugadores por página
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Limpiar la búsqueda
  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
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

        <p className="app__results">
          Resultados encontrados: {filteredPlayers.length}
        </p>

        <PlayerTable players={paginatedPlayers} />

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
