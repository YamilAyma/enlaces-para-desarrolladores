# Guía de Desarrollo y Despliegue

Este documento explica cómo mantener y desplegar el proyecto **Enlaces para Desarrolladores**.

## 🚀 Flujo de Trabajo: Agregar un Nuevo Enlace

Este proyecto utiliza una arquitectura **"README-first"**. Esto significa que **no necesitas tocar el código** para agregar contenido. La base de datos es el archivo `README.md` principal.

### Pasos para agregar un recurso:

1.  **Abre el archivo** `README.md` que se encuentra en la raíz del proyecto.
2.  **Busca la categoría** donde encaja el nuevo recurso (por ejemplo, `# IA`, `# Herramientas`, `# Iconos`).
    *   *Nota: Las categorías se definen con encabezados de nivel 3 (`###`).*
3.  **Agrega el enlace** a la lista usando el formato estándar de Markdown:
    ```markdown
    - [Nombre del Recurso](https://url-del-recurso.com)
    ```
4.  **Guarda el archivo**.
    *   **En Desarrollo (`pnpm dev`)**: La página se actualizará instantáneamente.
    *   **En Producción**: Al hacer `git push` con los cambios en el README, el sitio se reconstruirá automáticamente (si usas Vercel/Netlify) y el nuevo enlace aparecerá.

---

## ☁️ Guía de Despliegue

La aplicación es un sitio estático generado con **Next.js**. La forma más fácil y recomendada de desplegarlo es usando **Vercel**.

### Opción 1: Vercel (Automático y Recomendado)

1.  Sube tu código a un repositorio de **GitHub**.
2.  Crea una cuenta en [Vercel](https://vercel.com).
3.  Haz clic en **"Add New Project"** e importa tu repositorio.
4.  **Configuración del Proyecto**:
    *   **Framework Preset**: Next.js (se detecta automático).
    *   **Root Directory**: `web` (⚠️ Importante: asegúrate de seleccionar la carpeta `web` como la raíz del proyecto en Vercel, o configura el "Root Directory" en los ajustes a `web`).
    *   **Build Command**: `next build` (default).
    *   **Output Directory**: `.next` (default).
5.  Haz clic en **Deploy**.

¡Listo! Vercel detectará cada vez que edites el `README.md` y redesplegará el sitio automáticamente.

### Opción 2: Netlify

1.  Sube tu código a **GitHub**.
2.  Crea una cuenta en [Netlify](https://netlify.com).
3.  Haz clic en **"Add new site"** -> **"Import an existing project"**.
4.  Conecta con GitHub y selecciona tu repositorio.
5.  **Configuración de Construcción**:
    *   **Base directory**: `web` (⚠️ Muy importante poner esto).
    *   **Build command**: `pnpm build` (o `next build`).
    *   **Publish directory**: `.next` (Netlify suele detectar Next.js automáticamente y configurar sus plugins, si te pide el directorio de salida para estáticos puro usa `out` si configuraste exportación, pero para Next.js estándar `.next` es correcto junto con el plugin de Netlify).
    *   *Tip*: Netlify instalará automáticamente `@netlify/plugin-nextjs` para que todo funcione perfecto.
6.  Haz clic en **Deploy**.

### Opción 3: Exportación Estática (Hosting Tradicional)

Si quieres subir los archivos a un hosting tradicional (Apache/Nginx) o GitHub Pages:

1.  Abre la terminal en la carpeta `web`.
2.  Ejecuta el comando de construcción:
    ```bash
    pnpm build
    ```
3.  El contenido listo para producción se generará en la carpeta `web/out` (nota: deberás configurar `output: 'export'` en `next.config.mjs` si deseas una exportación puramente estática sin servidor de Node.js, aunque la configuración actual ya genera páginas estáticas).

---

## 🛠 Comandos Útiles

Desde la carpeta `web/`:

-   `pnpm dev`: Inicia el servidor de desarrollo en `localhost:3000`.
-   `pnpm build`: Construye la aplicación para producción.
-   `pnpm lint`: Revisa errores de código.

