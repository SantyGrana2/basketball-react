
function Scoreboard() {
  return (
    <section className="scoreboard">
      <div className="scoreboard__team">
        <h2>LAL</h2>
        <p>Los Angeles Lakers</p>
      </div>

      <div className="scoreboard__score">
        <span>98</span>
        <span> - </span>
        <span>92</span>
      </div>

      <div className="scoreboard__team">
        <h2>GSW</h2>
        <p>Golden State Warriors</p>
      </div>
    </section>
  );
}

export default Scoreboard;
