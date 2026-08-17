# ⚙️ Guía de Configuración: Publicación Automatizada y RSS para Enlaces para Desarrolladores

Este documento reúne todas las especificaciones, rutas de archivos, contratos de datos y configuraciones necesarias para tu **script de generación en lote**, el **feed RSS** y el **escenario de Make.com** conectado a tu **Página de Empresa en LinkedIn**.

---

## 📁 1. Rutas de Guardado para tu Script de Lote

Cuando tu script genere el lote de posts diarios y sus imágenes correspondientes, debe guardarlos en las siguientes rutas del proyecto:

| Tipo de Contenido | Ruta en el Proyecto | Ejemplo de Archivo | Propósito |
| :--- | :--- | :--- | :--- |
| **Posts Diarios (Lote)** | `web/content/posts/` | `web/content/posts/recursos-2026-08-17.md` | Entregas breves de recursos para Make / LinkedIn / RSS |
| **Artículos Editoriales** | `web/content/articles/` | `web/content/articles/nueva-era-enlaces.md` | Guías largas del blog (/blog) |
| **Imágenes de Portada** | `web/public/og/posts/` | `web/public/og/posts/recursos-2026-08-17.webp` | Portadas servidas públicamente para redes y RSS |

> **Nota:** La URL pública final de la imagen servida por Netlify será:  
> `https://enlaces-para-desarrolladores.netlify.app/og/posts/recursos-2026-08-17.webp`

---

## 📝 2. Contrato de Datos de los Posts (`.md`)

Cada archivo creado en `web/posts/recursos-YYYY-MM-DD.md` debe seguir este esquema exacto para garantizar la compatibilidad con el blog web y con el parseador RSS para Make:

```markdown
---
title: "Recursos para Desarrolladores - 2026-08-17"
image: "/og/posts/recursos-2026-08-17.webp"
imageAlt: "Recopilación de recursos para desarrolladores - 2026-08-17"
copy: "Recursos de hoy: Herramienta 1, Herramienta 2, Herramienta 3"
category: "General"
date: "2026-08-17"
published: true
tags:
  - posts
  - resources
  - enlaces-para-desarrolladores
---

Despedimos la semana con una selección de herramientas clave para programadores.

---

Developer Portfolios: Lista curada de portafolios de programadores para inspirarte.
Link: https://github.com/emmabostian/developer-portfolios

Awesome GitHub Profiles: Ejemplos creativos de perfiles de GitHub para inspiración.
Link: https://zzetao.github.io/awesome-github-profile/

SaaS Landing Pages: Galería de inspiración con ejemplos reales de landing pages.
Link: https://saaslandingpage.com/

---

🤖 Nota: Soy un bot programado para ayudarte a mantenerte al día con recursos de desarrollo.
```

### Reglas Clave del Contenido
1. **`date`**: Formato estricto `AAAA-MM-DD` (ej. `2026-08-17`). El sitio web y el RSS liberarán la entrada automáticamente cuando la fecha actual sea igual o posterior a esta fecha.
2. **`published`**: `true` para que sea procesado.
3. **`copy`**: Texto corto (1 a 2 líneas) que funciona como hook / resumen en la descripción del feed.
4. **Cuerpo del post**: Texto plano con estructura limpia y enlaces directos (`Link: https://...`).

---

## 🔄 3. Automatización de Reconstrucción Diaria (Netlify + GitHub Actions)

Como los posts se suben por adelantado en lotes fechados a futuro, Netlify debe reconstruir el sitio cada día para actualizar la fecha presente y liberar la nueva entrada en el RSS.

### Paso A: Crear el Build Hook en Netlify
1. Ve a tu panel de **Netlify** > Tu Sitio > **Site configuration** > **Build & deploy** > **Continuous Deployment**.
2. Desplázate hasta la sección **Build hooks** y haz clic en **Add build hook**.
3. Nómbralo (ej. `Daily RSS & Post Release`) y selecciona la rama `main`.
4. Copia la URL generada (ej. `https://api.netlify.com/build_hooks/6789abcdef...`).

### Paso B: Guardar el Secreto en GitHub
1. Ve a tu repositorio en **GitHub** > **Settings** > **Secrets and variables** > **Actions**.
2. Haz clic en **New repository secret**.
3. **Nombre:** `NETLIFY_BUILD_HOOK_URL`
4. **Valor:** Pega la URL del Build Hook copiada de Netlify.

### Paso C: Workflow de GitHub Actions
El archivo `.github/workflows/netlify-rebuild.yml` ya está configurado para ejecutarse automáticamente a las **00:05 UTC** de cada día:

```yaml
name: Daily Netlify Rebuild

on:
  schedule:
    - cron: '5 0 * * *'
  workflow_dispatch:

jobs:
  rebuild:
    name: Trigger Netlify Build Hook
    runs-on: ubuntu-latest
    steps:
      - name: Send POST request to Netlify Build Hook
        run: |
          curl -X POST -d {} "${{ secrets.NETLIFY_BUILD_HOOK_URL }}"
```

---

## 🤖 4. Configuración del Escenario en Make.com (LinkedIn Company Page)

### Diagrama del Flujo en Make
```
[ RSS Feed: Watch Items ]  --->  [ Text / String Manipulation (Opcional) ]  --->  [ LinkedIn: Create an Organization Post ]
```

### Módulo 1: RSS Feed — `Watch RSS feed items`
* **URL del Feed:** `https://enlaces-para-desarrolladores.netlify.app/posts/rss.xml`
* **URL to retrieve:** `URL from link`
* **Maximum number of returned items:** `1`
* **Filtro / Procesamiento:** Make detectará cada nuevo ítem que aparezca cuando se libere el post del día.

### Módulo 2: LinkedIn — `Create an Organization Post` / `Create a Post`
* **Account / Connection:** Conexión OAuth2 con permisos de administrador en la Página de Empresa de LinkedIn.
* **Organization:** Selecciona tu **Página de Empresa** (o escribe su Organization URN `urn:li:organization:XXXXXXX`).
* **Content / Commentary:**  
  Mapea la variable `content:encoded` (o `description` según tu preferencia de texto).  
  *Tip:* Si usas `content:encoded` con delimitadores `<br/>`, puedes usar la función de Make `replace({{content:encoded}}; <br/>; newline)` si el módulo de LinkedIn espera saltos de línea crudos, o enviarlo directo si admite HTML.
* **Media Category:** `IMAGE` (o `ARTICLE`)
* **Image URL:** Mapea el atributo de `enclosure.url` o `media:content.url` que viene en el feed.
* **Title / Alt:** Mapea `title` y `media:content.media:description`.

---

## 🔑 5. Resumen de Credenciales y Parámetros Externos

| Servicio | Variable / Parámetro | Dónde se Configura | Descripción |
| :--- | :--- | :--- | :--- |
| **GitHub** | `NETLIFY_BUILD_HOOK_URL` | *Repo > Settings > Secrets > Actions* | URL del webhook de Netlify para disparar el build diario. |
| **Netlify** | Build Hook `Daily RSS Release` | *Netlify > Site configuration > Build hooks* | Endpoint que recibe el POST y recompila el sitio. |
| **Make.com** | Feed URL | *Módulo RSS de Make* | `https://enlaces-para-desarrolladores.netlify.app/posts/rss.xml` |
| **LinkedIn** | Organization ID / Page Admin | *Conexión LinkedIn en Make* | Permisos `w_organization_social` / Administrador de la página de empresa. |
