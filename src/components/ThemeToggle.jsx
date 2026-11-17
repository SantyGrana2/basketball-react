
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={
        isDark
          ? "Activar modo claro"
          : "Activar modo oscuro"
      }
      aria-pressed={!isDark}
    >
      <span aria-hidden="true">
        {isDark ? "☀️" : "🌙"}
      </span>

      <span>
        {isDark ? "Modo claro" : "Modo oscuro"}
      </span>
    </button>
  );
}

export default ThemeToggle;
