# APRENDIZAJE — Basketball React

## 1. Introducción

El desarrollo de **Basketball React — Central de Rendimiento** permitió poner en práctica conocimientos de programación frontend mediante React, JavaScript, HTML y CSS.

Durante el proyecto se trabajó en la construcción de una aplicación interactiva para consultar información de jugadores de baloncesto, incorporando funcionalidades de búsqueda, ordenamiento, paginación, estadísticas, favoritos, historial y ventanas de detalles.

También se fortalecieron habilidades relacionadas con el control de versiones, la organización de componentes y la solución de errores.

## 2. Aprendizajes técnicos

### Componentes de React

Aprendimos a dividir una aplicación en componentes reutilizables, facilitando la organización del código y la separación de responsabilidades.

Entre los componentes desarrollados se encuentran `SearchBar`, `PlayerTable`, `PlayerRow`, `Pagination`, `StatsPanel`, `SearchHistory` y `Modal`.

### Manejo de estados

Utilizamos `useState` para controlar la información que cambia durante la interacción del usuario, como la búsqueda, los favoritos, el tema visual, la página seleccionada y el jugador mostrado en el modal.

### Efectos y almacenamiento local

Mediante `useEffect` implementamos comportamientos relacionados con la búsqueda y la persistencia de información.

Utilizamos `localStorage` para conservar favoritos, historial de búsquedas y preferencias del tema.

### Optimización

Aplicamos `useMemo` para organizar los resultados filtrados, ordenar jugadores y calcular estadísticas.

Esto permitió comprender cómo evitar cálculos innecesarios cuando los datos utilizados no cambian.

### Diseño de interfaces

Trabajamos con CSS para construir una interfaz deportiva que utiliza colores, tarjetas, botones, tablas y animaciones.

También aprendimos la importancia de mantener una identidad visual consistente entre los componentes y adaptar la interfaz a diferentes tamaños de pantalla.

## 3. Dificultades y soluciones

### Integración de funcionalidades

**Dificultad:** al incorporar nuevas funcionalidades, era necesario mantener la compatibilidad entre componentes y las propiedades recibidas desde `App.jsx`.

**Solución:** organizamos los componentes y verificamos las funcionalidades después de cada integración.

### Actualización del historial

**Dificultad:** aparecieron advertencias de React y ESLint al actualizar el historial directamente dentro de un efecto.

**Solución:** reorganizamos el código para realizar el registro de búsquedas mediante el temporizador del debounce, evitando actualizar el estado directamente en el cuerpo del efecto.

### Orden de declaración de variables

**Dificultad:** se produjo el error `Cannot access variable before it is declared`.

**Solución:** reorganizamos las declaraciones de estado para que estuvieran disponibles antes de utilizarse.

### Diseño visual

**Dificultad:** algunos controles conservaban los estilos predeterminados del navegador y no tenían armonía con el resto de la página.

**Solución:** personalizamos los campos de búsqueda, los botones de favoritos, las estrellas y la paginación, manteniendo los colores de ambos temas.

### Trabajo con Git

**Dificultad:** debíamos organizar los aportes de tres integrantes que trabajaban desde un mismo computador.

**Solución:** utilizamos ramas individuales y configuramos la identidad de Git correspondiente a cada integrante antes de registrar sus cambios.

## 4. Trabajo colaborativo

### Santiago Granados Garzón

Participó en la integración de funcionalidades y en el desarrollo de herramientas como la búsqueda, las estadísticas, los favoritos, el historial y el modal de detalles.

Durante este proceso fortaleció sus conocimientos sobre estados de React, efectos, optimización y comunicación entre componentes.

### Mariana Manrique Martínez

Participó en la creación de componentes para mostrar jugadores, la organización de los datos, la paginación y el ordenamiento de registros.

Estos desarrollos permitieron fortalecer conocimientos sobre propiedades de componentes, manejo de arreglos y presentación dinámica de información.

### María Isabella Ramírez Giraldo

Participó en la construcción de estilos visuales, la presentación de los componentes y la implementación del modo claro y oscuro.

Esto permitió profundizar en CSS, variables de diseño, persistencia de preferencias y experiencia de usuario.

## 5. Buenas prácticas aplicadas

- Separación del proyecto en componentes reutilizables.
- Uso de nombres descriptivos para variables y funciones.
- Organización de estilos mediante clases CSS.
- Control de versiones con Git y GitHub.
- Desarrollo de funcionalidades en ramas individuales.
- Pruebas después de implementar cambios.
- Manejo de estados y efectos mediante hooks.
- Persistencia de información en el navegador.

## 6. Reflexión final

Este proyecto permitió comprender que desarrollar una aplicación web no consiste únicamente en escribir código, sino también en organizar correctamente sus componentes, identificar errores, realizar pruebas y mejorar continuamente la experiencia del usuario.

Una de las enseñanzas más importantes fue aprender a integrar distintas funcionalidades sin afectar las que ya estaban funcionando.

Asimismo, el trabajo colaborativo permitió reconocer la importancia de mantener un código organizado, registrar los avances mediante Git y comunicar los cambios realizados.

El resultado fue una aplicación funcional que integra diferentes herramientas de React y representa un avance en nuestras habilidades de desarrollo web.

## 7. Conclusión

Basketball React fue una oportunidad para aplicar conocimientos de Programación 4 en un proyecto práctico.

El desarrollo fortaleció competencias en React, JavaScript, CSS, manejo de datos, control de versiones y solución de problemas.

Los conocimientos adquiridos servirán como base para futuros proyectos web de mayor complejidad.

---

**Universidad de Manizales**  
**Asignatura:** Programación 4  
**Proyecto:** Basketball React — Central de Rendimiento  
**Año:** 2026