# Knowledge Base (Base de Conocimiento) - Enlaces para Desarrolladores

Este archivo es la única fuente de verdad viva del proyecto. Contiene el contexto de todos los pilares de la plataforma y el registro de sincronización de los agentes.

---

## 🏗️ Pilares del Proyecto

### 1. Infraestructura y Desarrollo
*   **Arquitectura:** "README-as-Database" (el archivo `README.md` en la raíz actúa como base de datos central).
*   **Stack Técnico:** Next.js 16 (Turbopack), Tailwind CSS v4, TypeScript y Lucide React.
*   **Mapeo de Datos:** El archivo `web/lib/data.ts` parsea dinámicamente los bloques Markdown del README para construir la interfaz.
*   **Optimización AEO:** Un script genera en cada construcción un archivo `llms.txt` en `/web/public` para facilitar la lectura por parte de agentes de IA.
*   **Alojamiento:** Netlify (URL: `https://enlaces-para-desarrolladores.netlify.app`).

### 2. Diseño e Identidad Visual
*   **Estilo Principal:** Modo oscuro premium (Black & Dark Gray) con acento verde ácido (`#CAFC00`).
*   **Tipografía:** Roboto (Next.js Fonts).
*   **Interacciones:** Micro-animaciones con Framer Motion y hover effects dinámicos.

### 3. Sistema de Blog y Portadas OG Automáticas
*   **Artículos:** Almacenados en `web/posts/` en formato Markdown con frontmatter YAML.
*   **Feed RSS:** Generado estáticamente en `/posts/rss.xml` con descripción plana y content:encoded en HTML (saltos de línea `<br/>` sin envoltura CDATA).
*   **Generación de Portadas (WebP):** El script `web/scripts/generate-post-covers.mjs` genera automáticamente portadas WebP optimizadas (~15 KB) para cada post (`public/og/posts/`) y categoría (`public/og/`) en cada build.

---

## 📝 Estado Actual del Blog y Publicador (17/06/2026)
*   Se han creado 10 nuevas entradas de blog programadas cada 3 días comenzando desde el `2026-06-17` hasta el `2026-07-14`.
*   Se ejecutó con éxito la generación de portadas y la compilación estática de Next.js, verificando que no existan errores de parseo de Markdown ni de tipos de TypeScript.
*   Los archivos están listos para confirmación (commits) individuales a la espera de la instrucción del usuario.

---

## 🤝 Handover (Entrega de Turnos)
*   **Fase Actual:** Redacción y validación completadas.
*   **Siguiente Paso:** Esperar la instrucción del usuario para realizar los commits de cada uno de los 10 posts creados.
