
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import PlayerTable from "./components/PlayerTable";
import Pagination from "./components/Pagination";
import StatsPanel from "./components/StatsPanel";
import ThemeToggle from "./components/ThemeToggle";
import FavoritesFilter from "./components/FavoritesFilter";
import Modal from "./components/Modal";

import { players } from "./data/players";

// ========================================
// FUNCION PARA ORGANIZAR EL HISTORIAL
// ========================================

function addSearchToHistory(previous, value) {
  const term = value.trim();

  if (!term) {
    return previous;
  }

  const normalizedTerm = term.toLocaleLowerCase("es");

  const withoutDuplicates = previous.filter(
    (item) =>
      item.toLocaleLowerCase("es") !== normalizedTerm
  );

  return [term, ...withoutDuplicates].slice(0, 5);
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function App() {
  // ========================================
  // 1. TEMA CLARO Y OSCURO
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
      // Continuar si localStorage no esta disponible
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((previous) =>
      previous === "dark" ? "light" : "dark"
    );
  };

  // ========================================
  // 2. BUSQUEDA DE JUGADORES
  // ========================================

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ========================================
  // 3. HISTORIAL DE BUSQUEDAS
  // ========================================

  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("basketball-search-history") ||
          "[]"
      );

      if (!Array.isArray(saved)) {
        return [];
      }

      return saved
        .filter(
          (term) =>
            typeof term === "string" &&
            term.trim() !== ""
        )
        .reduce((history, term) => {
          const normalized = term
            .trim()
            .toLocaleLowerCase("es");

          if (
            history.some(
              (item) =>
                item.toLocaleLowerCase("es") === normalized
            )
          ) {
            return history;
          }

          if (history.length >= 5) {
            return history;
          }

          return [...history, term.trim()];
        }, []);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "basketball-search-history",
        JSON.stringify(searchHistory)
      );
    } catch {
      // Continuar si localStorage no esta disponible
    }
  }, [searchHistory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);

      const term = search.trim();

      if (term) {
        setSearchHistory((previous) =>
          addSearchToHistory(previous, term)
        );
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ========================================
  // 4. PAGINACION
  // ========================================

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ========================================
  // 5. ORDENAMIENTO
  // ========================================

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null
  });

  // ========================================
  // 6. FAVORITOS
  // ========================================

  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("basketball-favorites") ||
          "[]"
      );

      if (!Array.isArray(saved)) {
        return [];
      }

      return saved.filter((id) =>
        players.some((player) => player.id === id)
      );
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
      // Continuar si localStorage no esta disponible
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
  // 7. FUNCIONES DEL HISTORIAL
  // ========================================

  const handleSelectHistory = (term) => {
    setSearch(term);
    setDebouncedSearch(term);
    setCurrentPage(1);

    setSearchHistory((previous) =>
      addSearchToHistory(previous, term)
    );
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  // ========================================
  // 8. FUNCIONES DE BUSQUEDA
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
  // 9. FILTRAR JUGADORES
  // ========================================

  const filteredPlayers = useMemo(() => {
    const searchText = debouncedSearch
      .trim()
      .toLocaleLowerCase("es");

    return players.filter((player) => {
      const matchesSearch = player.name
        .toLocaleLowerCase("es")
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
  // 10. ORDENAR JUGADORES
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
  // 11. CALCULAR PAGINACION
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

  const handlePageSizeChange = (size) => {
    setPageSize(Number(size));
    setCurrentPage(1);
  };

  // ========================================
  // 12. ORDENAMIENTO DE COLUMNAS
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
  // 13. MODAL DE DETALLES
  // ========================================

  const [selectedPlayer, setSelectedPlayer] =
    useState(null);

  const handleViewDetails = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedPlayer(null);
  }, []);

  // ========================================
  // 14. INTERFAZ PRINCIPAL
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

        <SearchHistory
          history={searchHistory}
          onSelectSearch={handleSelectHistory}
          onClearHistory={handleClearHistory}
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
          onViewDetails={handleViewDetails}
        />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </main>

      {selectedPlayer && (
        <Modal
          player={selectedPlayer}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
