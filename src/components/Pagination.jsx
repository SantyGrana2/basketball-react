
function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange
}) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const isFirstPage = currentPage === 1;
  const isLastPage =
    totalPages === 0 || currentPage >= totalPages;

  return (
    <nav
      className="pagination"
      aria-label="Paginación de jugadores"
    >
      <div className="pagination__size">
        <label htmlFor="page-size">
          Jugadores por página
        </label>

        <select
          id="page-size"
          className="pagination__select"
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(Number(event.target.value))
          }
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="pagination__buttons">
        <button
          type="button"
          className="pagination__button"
          disabled={isFirstPage}
          onClick={() => onPageChange(1)}
        >
          Primera
        </button>

        <button
          type="button"
          className="pagination__button"
          disabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹ Anterior
        </button>

        {pages.map((page) => (
          <button
            type="button"
            key={page}
            className={`pagination__button ${
              currentPage === page
                ? "pagination__button--active"
                : ""
            }`}
            aria-current={
              currentPage === page ? "page" : undefined
            }
            aria-label={`Ir a la página ${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="pagination__button"
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente ›
        </button>

        <button
          type="button"
          className="pagination__button"
          disabled={isLastPage}
          onClick={() => onPageChange(totalPages)}
        >
          Última
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
