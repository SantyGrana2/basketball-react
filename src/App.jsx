
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import PlayerTable from "./components/PlayerTable";
import { players } from "./data/players";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Scoreboard />
        <PlayerTable players={players} />
      </main>
    </div>
  );
}

export default App;
