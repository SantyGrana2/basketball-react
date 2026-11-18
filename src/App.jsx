
import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import SearchBar from "./components/SearchBar";
import PlayerTable from "./components/PlayerTable";
import Pagination from "./components/Pagination";
import StatsPanel from "./components/StatsPanel";
import ThemeToggle from "./components/ThemeToggle";
import FavoritesFilter from "./components/FavoritesFilter";

import { players } from "./data/players";

function App() {
  // ========================================
  // TEMA CLARO Y OSCURO
  // ========================================

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("basketball-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    try {
      localStorage.setItem("basketball-theme", theme);
    } catch {
      // Continuar si localStorage no está disponible
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((previous) =>
      previous === "dark" ? "light" : "dark"
    );
  };

  // ========================================
  // BUSQUEDA DE JUGADORES
  // ========================================

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ========================================
  // PAGINACION
  // ========================================

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ========================================
  // ORDENAMIENTO DE COLUMNAS
  // ========================================

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null
  });

  // ========================================
  // FAVORITOS
  // ========================================

  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("basketball-favorites") || "[]"
      );

      return Array.isArray(saved)
        ? saved.filter((id) =>
            players.some((player) => player.id === id)
          )
        : [];
    } catch {
      return [];
    }
  });

  const [showOnlyFavorites, setShowOnlyFavorites] =
    useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        "basketball-favorites",
        JSON.stringify(favoriteIds)
      );
    } catch {
      // Continuar si localStorage no está disponible
    }
  }, [favoriteIds]);

  const handleToggleFavorite = (playerId) => {
    setFavoriteIds((previous) =>
      previous.includes(playerId)
        ? previous.filter((id) => id !== playerId)
        : [...previous, playerId]
    );
  };

  const handleToggleFavoritesFilter = () => {
    setShowOnlyFavorites((previous) => !previous);
    setCurrentPage(1);
  };

  // ========================================
  // FILTRAR JUGADORES
  // ========================================

  const filteredPlayers = useMemo(() => {
    const searchText = debouncedSearch
      .trim()
      .toLowerCase();

    return players.filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(searchText);

      const matchesFavorites =
        !showOnlyFavorites ||
        favoriteIds.includes(player.id);

      return matchesSearch && matchesFavorites;
    });
  }, [
    debouncedSearch,
    showOnlyFavorites,
    favoriteIds
  ]);

  // ========================================
  // ORDENAR JUGADORES
  // ========================================

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

  // ========================================
  // CALCULAR PAGINACION
  // ========================================

  const totalPages = Math.ceil(
    sortedPlayers.length / pageSize
  );

  const safePage = Math.max(
    1,
    Math.min(currentPage, totalPages || 1)
  );

  const startIndex = (safePage - 1) * pageSize;

  const paginatedPlayers = sortedPlayers.slice(
    startIndex,
    startIndex + pageSize
  );

  // ========================================
  // FUNCIONES DE BUSQUEDA
  // ========================================

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  // ========================================
  // FUNCIONES DE PAGINACION
  // ========================================

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // ========================================
  // FUNCIONES DE ORDENAMIENTO
  // ========================================

  const handleSort = (key) => {
    setSortConfig((previous) => {
      if (previous.key !== key) {
        return {
          key,
          direction: "asc"
        };
      }

      if (previous.direction === "asc") {
        return {
          key,
          direction: "desc"
        };
      }

      return {
        key: null,
        direction: null
      };
    });

    setCurrentPage(1);
  };

  // ========================================
  // INTERFAZ PRINCIPAL
  // ========================================

  return (
    <div className="app">
      <div className="app__theme-controls">
        <ThemeToggle
          theme={theme}
          onToggle={handleThemeToggle}
        />
      </div>

      <Header />

      <main className="app__main">
        <Scoreboard />

        <SearchBar
          value={search}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />

        <FavoritesFilter
          favoritesCount={favoriteIds.length}
          showOnlyFavorites={showOnlyFavorites}
          onToggleFilter={handleToggleFavoritesFilter}
        />

        <StatsPanel players={filteredPlayers} />

        <p className="app__results">
          Resultados encontrados: {filteredPlayers.length}
        </p>

        <PlayerTable
          players={paginatedPlayers}
          sortConfig={sortConfig}
          onSort={handleSort}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
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
