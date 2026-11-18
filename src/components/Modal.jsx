
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ player, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!player) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const modal = closeButtonRef.current?.closest(
          ".player-modal"
        );

        if (!modal) return;

        const focusableElements = Array.from(
          modal.querySelectorAll(
            'button:not([disabled]), a[href], ' +
            'input:not([disabled]), ' +
            'select:not([disabled]), ' +
            'textarea:not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last =
          focusableElements[focusableElements.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [player, onClose]);

  if (!player) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="player-modal__overlay"
      onMouseDown={handleOverlayClick}
    >
      <section
        className="player-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-modal-title"
      >
        <div className="player-modal__header">
          <div>
            <span className="player-modal__subtitle">
              Ficha del jugador
            </span>

            <h2
              id="player-modal-title"
              className="player-modal__title"
            >
              {player.name}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="player-modal__close"
            onClick={onClose}
            aria-label="Cerrar detalles"
          >
            ×
          </button>
        </div>

        <div className="player-modal__content">
          <div className="player-modal__number">
            #{player.number}
          </div>

          <div className="player-modal__details">
            <div className="player-modal__detail">
              <span>Equipo</span>
              <strong>{player.team}</strong>
            </div>

            <div className="player-modal__detail">
              <span>Posición</span>
              <strong>{player.position}</strong>
            </div>

            <div className="player-modal__detail">
              <span>Edad</span>
              <strong>{player.age} años</strong>
            </div>

            <div className="player-modal__detail">
              <span>Anotaciones</span>
              <strong>{player.goals}</strong>
            </div>
          </div>
        </div>

        <div className="player-modal__footer">
          <button
            type="button"
            className="player-modal__action"
            onClick={onClose}
          >
            Cerrar detalles
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}

export default Modal;
