---
title: Curación de Recursos Tecnológicos
description: Protocolo para la investigación, validación e integración de nuevos recursos en el README.md.
---

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
Identificar la sección más adecuada del `README.md` según la naturaleza del recurso. Es CRÍTICO usar la categoría correcta para mantener el orden:

- `📦 PACKS`: Colecciones masivas, directorios de herramientas, packs de utilidades o recursos "Awesome".
- `📄 LISTAS`: Repositorios tipo lista, hojas de cálculo colaborativas, reportes anuales (ej: State of JS).
- `🧗 ROADMAPS`: Guías de aprendizaje paso a paso o rutas para dominar una tecnología (ej: Laravel Roadmap).
- `APIs`: Servicios externos consumibles vía HTTP (geolocalización, finanzas, datos públicos, IPQuery).
- `🖥️ Técnico`: Frameworks de bajo nivel, agentes de IA avanzados, arquitecturas, optimización, componentes core.
- `🛠️ HERRAMIENTAS`: CLI, utilidades de sistema, gestores de paquetes, software de productividad, depuradores.
    - `#### Despliegue`: Plataformas específicas para hosting o despliegue (ej: PythonAnywhere).
- `🤗 RELAX`: Humor para devs, juegos retro, museos digitales, visualizaciones creativas no técnicas.
- `🌐 WEB`: Librerías de frontend ligeras, efectos visuales (parallax, animaciones CSS/JS), hooks (ej: Rooks).
- `🅰️ Iconos`: Repositorios de SVG, sets de logos tecnológicos, fuentes de iconos.
- `⭐ PACKS DE COMPONENTES y LIBRERIAS`: Bibliotecas UI (React, Svelte, Vue), primitivas de diseño (ej: Radix, Shadcn).
- `🧩 PLANTILLAS Y EJEMPLOS`: Starter kits, proyectos base, ejemplos de landing pages, dashboards pre-configurados.
- `📖 ARTICULOS INTERESANTES`: Lectura técnica profunda, manuales prácticos, reflexiones sobre ingeniería.
- `📚 DOCUMENTACIÓN UTIL`: Cheatsheets, visualizadores educativos, referencias de lenguaje, guías de prompts.
- `📒 CURSOS`: Plataformas de aprendizaje, desafíos prácticos, laboratorios interactivos.
- `🔠 TIPOGRAFIAS`: Fuentes para programadores, fundiciones tipográficas, previsualizadores de fuentes.
- `📣 BLOGS Y BOLETINES`: Newsletters técnicas, boletines semanales, blogs de ingeniería corporativos.
- `🏠 Self-Hosted (Autoalojado)`: Herramientas para correr en tus propios servidores (Docker, gestores de descarga).
- `🤖 IA`: Enlaces a modelos de IA directos (ChatGPT, Gemini, Claude, Mistral).
    - `#### ✨ Herramientas IA`: Agentes, clonadores de sitios, frameworks de agentes, herramientas locales (Ollama).
- `🎙️ Podcast`: Contenido en audio sobre tecnología y ecosistemas de programación.
- `🌐 Otros medios`: Foros, comunidades (Reddit r/coolgithubprojects), plataformas de feed de noticias (Hackertab).
- `💫 INSPIRACIÓN`: Galerías de diseño web, portafolios excepcionales, ejemplos de UI/UX de alto nivel (Bento Grids, Godly).

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
