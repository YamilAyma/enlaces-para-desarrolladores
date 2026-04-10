# 🛠️ Workflow: Curación de Recursos Tecnológicos

Este flujo de trabajo describe los pasos que debe seguir un agente para procesar una lista de enlaces y agregarlos al repositorio de "Enlaces para Desarrolladores".

## 🎯 Objetivo
Mantener el `README.md` actualizado con herramientas de alta calidad, evitando duplicados y manteniendo una categorización coherente.

## 📋 Pasos del Workflow

### 1. Recepción e Investigación
- El usuario proporciona uno o más enlaces.
- **Acción:** Utilizar herramientas de búsqueda para obtener una descripción técnica precisa en español (máximo 150-200 caracteres).
- **Enfoque:** Priorizar el valor que aporta al desarrollador y las tecnologías principales (ej: "Librería React", "Escrito en Rust", "Basado en IA").

### 2. Verificación de Duplicados
- Antes de agregar cualquier recurso, se debe verificar si el enlace o el nombre ya existe en el `README.md`.
- **Comando sugerido:** `grep -i "nombre_o_url" README.md`
- **Regla:** Si ya existe, informar al usuario con el número de línea y el enlace actual. NO duplicar.

### 3. Categorización
Identificar la sección más adecuada del `README.md` según la naturaleza del recurso. No limitarse a las categorías más comunes:

- `📦 PACKS`: Colecciones masivas de recursos, directorios de herramientas o "packs" de utilidades.
- `📄 LISTAS`: Repositorios tipo "Awesome", hojas de cálculo con datos o recopilaciones estáticas.
- `🧗 ROADMAPS`: Guías de aprendizaje paso a paso o rutas para dominar una tecnología.
- `APIs`: Servicios externos consumibles vía HTTP (geolocalización, finanzas, datos públicos).
- `🖥️ Técnico`: Frameworks de bajo nivel, agentes de IA avanzados, arquitecturas distribuidas, optimización.
- `🛠️ HERRAMIENTAS`: CLI, utilidades de sistema, gestores de paquetes, software de productividad, depuradores.
- `🤗 RELAX`: Humor para devs, juegos retro, museos digitales, visualizaciones nostálgicas.
- `🌐 WEB`: Librerías de frontend ligeras, efectos visuales (parallax, animaciones CSS/JS), micro-interacciones.
- `🅰️ Iconos`: Repositorios de SVG, fuentes de iconos, sets de logos tecnológicos.
- `⭐ PACKS DE COMPONENTES y LIBRERIAS`: Bibliotecas de componentes UI (React, Vue, Svelte), hooks, primitivas de diseño.
- `🧩 PLANTILLAS Y EJEMPLOS`: Starter kits, proyectos base, ejemplos de landing pages, dashboards pre-configurados.
- `📖 ARTICULOS INTERESANTES`: Lectura técnica profunda, reflexiones sobre ingeniería, guías de buenas prácticas.
- `📚 DOCUMENTACIÓN UTIL`: Cheatsheets, visualizadores educativos, referencias de lenguaje, glosarios técnicos.
- `📒 CURSOS`: Plataformas de aprendizaje, desafíos prácticos, laboratorios interactivos (tipo labs).
- `🔠 TIPOGRAFIAS`: Fuentes diseñadas para programación, fundiciones tipográficas, herramientas de previsualización.
- `📣 BLOGS Y BOLETINES`: Newsletters técnicas, comunidades locales, blogs personales de referentes tech.

### 4. Implementación Quirúrgica
- Los nuevos recursos deben añadirse **al final de la lista de su respectiva sección**.
- Mantener el formato: `- [Nombre](URL): Descripción en español finalizando en punto.`

### 5. Persistencia y Despliegue
- Los cambios deben realizarse directamente en la rama `main` (a menos que se indique lo contrario).
- **Mensaje de commit:** Deberá seguir el formato `feat (README) - [Descripción concisa]`.
- **Acción final:** Enviar `push` al repositorio remoto.

### 6. Reporte Final
- Notificar al usuario los recursos añadidos.
- Listar los recursos que fueron omitidos por estar duplicados.
