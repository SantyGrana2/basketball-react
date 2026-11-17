
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import SearchBar from "./components/SearchBar";
import PlayerTable from "./components/PlayerTable";
import { players } from "./data/players";

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredPlayers = players.filter((player) =>
    player.name
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase())
  );

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Scoreboard />

        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => {
            setSearch("");
            setDebouncedSearch("");
          }}
        />

        <p className="app__results">
          Resultados encontrados: {filteredPlayers.length}
        </p>

        <PlayerTable players={filteredPlayers} />
      </main>
    </div>
  );
}

export default App;
