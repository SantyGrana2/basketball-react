# 🏀 Basketball React — Central de Rendimiento

Aplicación web interactiva desarrollada con **React y Vite**, orientada a la consulta, organización y análisis de estadísticas de jugadores de baloncesto.

Este proyecto fue realizado como parte de la asignatura **Programación 4** de la Universidad de Manizales, con el propósito de aplicar conceptos de desarrollo frontend, componentes reutilizables, manejo de estados, hooks de React, almacenamiento local y diseño adaptable.

## Integrantes

- Santiago Granados Garzón
- Mariana Manrique Martínez
- María Isabella Ramírez Giraldo

## Objetivo del proyecto

Desarrollar una aplicación web que permita consultar información de jugadores de baloncesto de manera dinámica, incorporando herramientas de búsqueda, filtrado, ordenamiento, paginación y visualización de estadísticas.

## Funcionalidades

### 1. Búsqueda de jugadores

Permite buscar jugadores por nombre mediante un campo interactivo.

Incluye:

- Actualización de resultados.
- Debounce de 300 milisegundos.
- Contador de resultados encontrados.
- Botón para limpiar la búsqueda.

### 2. Paginación

Organiza los jugadores en páginas para facilitar la navegación.

- Visualización de 5, 10 o 20 jugadores por página.
- Navegación a la primera y última página.
- Botones para avanzar y retroceder.
- Selección directa de páginas.

### 3. Ordenamiento

Permite ordenar los registros por número, nombre, equipo, posición, edad y anotaciones.

Cada columna dispone de tres estados:

1. Orden ascendente.
2. Orden descendente.
3. Orden original.

### 4. Panel de estadísticas

Presenta información calculada a partir de los jugadores filtrados:

- Total de jugadores.
- Promedio de anotaciones.
- Jugador con mayor número de anotaciones.
- Cantidad de posiciones diferentes.
- Distribución de jugadores por posición mediante barras.

Se utiliza `useMemo` para optimizar los cálculos.

### 5. Modo claro y oscuro

Permite cambiar entre dos apariencias visuales.

La preferencia se almacena en `localStorage`, por lo que se conserva después de actualizar la página.

### 6. Jugadores favoritos

Los usuarios pueden marcar y desmarcar jugadores favoritos mediante estrellas.

También pueden visualizar únicamente sus favoritos y conservar su selección mediante `localStorage`.

### 7. Historial de búsquedas

Almacena las últimas cinco búsquedas realizadas.

Permite:

- Consultar búsquedas recientes.
- Reutilizar una búsqueda anterior.
- Evitar términos duplicados.
- Limpiar el historial.
- Conservar los datos al recargar la página.

### 8. Modal de detalles

Cada jugador dispone de un botón para consultar su información en una ventana emergente.

El modal presenta nombre, número, equipo, posición, edad y anotaciones.

Puede cerrarse mediante el botón de cierre, la tecla Escape o un clic fuera de la ventana.

## Tecnologías utilizadas

- **React:** construcción de componentes e interfaces interactivas.
- **Vite:** entorno de desarrollo y compilación.
- **JavaScript:** lógica de la aplicación.
- **HTML5:** estructura de la página.
- **CSS3:** diseño visual, animaciones y adaptación a diferentes pantallas.
- **Git:** control de versiones.
- **GitHub:** alojamiento y colaboración del código fuente.
- **localStorage:** persistencia de preferencias y datos del usuario.

## Hooks utilizados

**useState:** administra estados como la búsqueda, los favoritos, la página actual, el tema y el jugador seleccionado.

**useEffect:** permite gestionar efectos relacionados con el almacenamiento local, el debounce y los eventos del modal.

**useMemo:** optimiza el filtrado, el ordenamiento y los cálculos estadísticos.

**useCallback:** mantiene estable la función utilizada para cerrar el modal.

**useRef:** permite gestionar el foco del teclado dentro de la ventana de detalles.

## Estructura del proyecto

```text
basketball-react/
├── public/
├── src/
│   ├── components/
│   │   ├── FavoritesFilter.jsx
│   │   ├── Header.jsx
│   │   ├── Modal.jsx
│   │   ├── Pagination.jsx
│   │   ├── PlayerRow.jsx
│   │   ├── PlayerTable.jsx
│   │   ├── Scoreboard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SearchHistory.jsx
│   │   ├── StatsPanel.jsx
│   │   └── ThemeToggle.jsx
│   ├── data/
│   │   └── players.js
│   ├── styles/
│   │   └── main.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Instalación y ejecución

Para ejecutar el proyecto localmente es necesario tener instalado Node.js y npm.

**1. Clonar el repositorio**

```bash
git clone URL_DEL_REPOSITORIO
```

**2. Entrar a la carpeta**

```bash
cd basketball-react
```

**3. Instalar las dependencias**

```bash
npm install
```

**4. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

**5. Abrir la dirección local**

```text
http://localhost:5173/
```

## Verificación del proyecto

Para ejecutar la revisión de código:

```bash
npm run lint
```

Para generar una versión de producción:

```bash
npm run build
```

## Datos utilizados

La aplicación utiliza un conjunto local de 25 registros de jugadores de baloncesto, almacenados en `src/data/players.js`.

Los datos estadísticos son demostrativos y no corresponden necesariamente a estadísticas oficiales o actualizadas de la NBA.

## Diseño visual

La interfaz utiliza una combinación de azul oscuro y amarillo, inspirada en la presentación visual de los tableros deportivos.

Incluye modo claro y oscuro, tarjetas estadísticas, tablas interactivas, botones personalizados y diseño adaptable.

## Trabajo colaborativo

El proyecto fue desarrollado mediante Git y GitHub, utilizando ramas de trabajo para implementar funcionalidades de manera organizada.

Las contribuciones de los integrantes se encuentran registradas en el historial de commits del repositorio.

## Contexto académico

**Universidad de Manizales**  
Asignatura: Programación 4  
Proyecto: Basketball React — Central de Rendimiento  
Año: 2026

---

Proyecto desarrollado con fines académicos y de aprendizaje.