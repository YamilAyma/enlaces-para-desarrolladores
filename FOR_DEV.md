# 🛠️ Guía de Contribución y Desarrollo / Contribution & Development Guide

[🇪🇸 Versión en Español](#-versión-en-español) | [🇬🇧 English Version](#-english-version)

---

# 🇪🇸 Versión en Español

¡Bienvenido/a a **Enlaces para Desarrolladores**! 🚀  
Este repositorio es un espacio abierto y colaborativo creado para recopilar herramientas, librerías, APIs, utilidades y enlaces útiles para desarrolladores.

> 🧭 **El espíritu de esta lista:**  
> No pretendemos ser una lista exclusiva de "perfección absoluta". Aquí encontrarás de todo: desde herramientas consolidadas y estándares de la industria, hasta proyectos emergentes, gemas ocultas o utilidades curiosas que encontramos por internet y que resultan interesantes de probar y explorar. ¡Si algo te llama la atención o te sirve en tu flujo de trabajo, es bienvenido!

> 💡 **Nota sobre el idioma:** Todos los Pull Requests (título y descripción) deben enviarse en **Español** para mantener la consistencia en el historial del proyecto.

---

## 📌 Recomendaciones para Enviar Recursos

Para mantener un balance entre apertura, utilidad y una buena experiencia para todos, te sugerimos tener en cuenta lo siguiente:

1. **Código Abierto o Libre Acceso (Open Source & Free Access)**:
   - Priorizamos proyectos open source, herramientas gratuitas o recursos con capas libres generosas para que la comunidad pueda usarlos sin barreras.
2. **Experiencia Limpia (Sin Anuncios Invasivos)**:
   - Si sugieres una página web, asegúrate de que no tenga publicidad invasiva (evitar pop-ups molestos, banners que bloqueen la pantalla o redirecciones engañosas). Si tiene algún anuncio, que sea discreto y no interfiera con el uso común.
3. **Proyectos Establecidos o Cosas Interesantes por Probar**:
   - Se aceptan tanto herramientas maduras como proyectos nuevos, creativos o experimentales que aporten valor o curiosidad al mundo dev.
4. **⭐ Apoya con una Estrellita**:
   - Si este repositorio te es de ayuda o quieres que tu recurso llegue a más personas, ¡deja tu estrella (Star) en GitHub! Nos ayuda a que la comunidad siga creciendo.
5. **🚀 Pase Directo para Creadores y Autores**:
   - ¿Creaste tú la herramienta o librería? **¡Preséntate en tu PR!** Cuéntanos brevemente de qué trata tu proyecto y qué problema resuelve. Nos encanta apoyar a los creadores y darles validación prioritaria / pase directo.
6. **📸 Captura de Pantalla (Opcional pero bienvenida)**:
   - Adjuntar una imagen o captura de la web/herramienta ayuda mucho a validar visualmente el recurso con rapidez.

---

## 🚀 Flujo de Trabajo: Agregar un Nuevo Enlace

Este proyecto sigue la arquitectura **"README-as-Database"**. No necesitas editar código ni componentes web:

1. **Haz un Fork** del repositorio y crea una rama:
   ```bash
   git checkout -b recurso/mi-herramienta
   ```
2. **Abre el archivo** `README.md` en la raíz.
3. **Ubica la categoría** correspondiente (por ejemplo, `### IA`, `### Herramientas`, `### Iconos`, `### CSS`, etc.).
4. **Agrega el enlace** con el formato Markdown estándar:
   ```markdown
   - [Nombre del Recurso](https://url-del-recurso.com)
   ```
5. **Guarda el archivo**, haz commit y sube tus cambios.
6. **Abre un Pull Request** completando la plantilla que aparece a continuación.

---

## 📋 Plantilla para Pull Requests (PR Template)

Puedes copiar y rellenar esta estructura para tu PR (ideal tanto si lo haces manual o con ayuda de IA):

```markdown
### 📝 Descripción del Recurso
- **Nombre:** [Nombre de la herramienta / web]
- **URL:** [https://...]
- **Categoría propuesta en README.md:** [Ej. IA, Iconos, CSS, Productividad, Utilidades]
- **Tipo de recurso:** [ ] Herramienta consolidada / [ ] Proyecto nuevo/experimental interesante para probar
- **¿De qué trata? (Breve descripción):** [Explica en 1 o 2 frases qué hace y por qué es interesante]

### 👤 Información del Contribuidor
- [ ] Soy el creador/autor de este recurso (¡Preséntate abajo si aplica!).
- [ ] No soy el creador, pero la encontré/probé y me pareció interesante para la lista.

<!-- Si eres el creador, cuéntanos un poco aquí: -->
<!-- Hola, soy [Tu Nombre] y creé [Nombre] para resolver [Problema]... -->

### 📸 Captura de Pantalla (Opcional)
<!-- Arrastra y suelta una imagen aquí si deseas -->

### ✅ Lista de Verificación (Checklist)
- [ ] He colocado el enlace en la sección adecuada del `README.md`.
- [ ] El enlace utiliza el formato estándar `- [Nombre](URL)`.
- [ ] He comprobado que el enlace funciona y no da error 404.
- [ ] No contiene publicidad invasiva ni elementos maliciosos.
- [ ] He dejado una estrellita ⭐ al repositorio para apoyar el proyecto.
- [ ] El PR está redactado en español.
```

---

## 💻 Desarrollo Local y Pruebas

Si quieres ver cómo se visualiza la página web localmente:

```bash
# Entrar a la carpeta web
cd web

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```
Abre [http://localhost:3000](http://localhost:3000) para ver la interfaz actualizada en vivo con los datos del `README.md`.

---

## ☁️ Guía de Despliegue

La plataforma web está construida con **Next.js 16**, **Tailwind CSS** y **TypeScript**.

### Opción 1: Netlify (Hosting Oficial)
1. Conecta el repositorio a Netlify.
2. Configuración de Build:
   - **Base directory:** `web`
   - **Build command:** `pnpm build`
   - **Publish directory:** `web/out` (o `.next`)

### Opción 2: Vercel
1. Importa el repositorio en [Vercel](https://vercel.com).
2. **Root Directory:** `web`.
3. **Framework Preset:** Next.js.
4. Haz clic en **Deploy**.

### Comandos Útiles (`web/`):
- `pnpm dev`: Servidor local de desarrollo.
- `pnpm build`: Compilación de producción.
- `pnpm lint`: Chequeo de linter y calidad de código.

---
---

# 🇬🇧 English Version

Welcome to **Enlaces para Desarrolladores**! 🚀  
This repository is an open, collaborative hub created to gather useful tools, libraries, APIs, utilities, and developer resources.

> 🧭 **The Spirit of this List:**  
> We don't aim to be an elitist, "100% perfection only" catalog. You will find a bit of everything here: from established industry standards to emerging projects, hidden gems, and curious little utilities found around the web that are fun or promising to try out. If something catches your eye or is useful to your workflow, it is welcome!

> ⚠️ **Language Policy:** Even though this documentation is bilingual, all Pull Requests (titles & descriptions) must be submitted in **Spanish** to maintain repository consistency.

---

## 📌 Submission Guidelines

To balance openness, utility, and a clean user experience, please keep the following in mind:

1. **Open Source & Free Access**:
   - We encourage open-source projects, free utilities, and tools with generous free tiers for the community.
2. **Clean Experience (No Invasive Ads)**:
   - If recommending a web app, make sure it has no disruptive pop-ups, obstructive ads, or deceptive redirects. If it contains ads, they should be subtle and non-intrusive.
3. **Established Tools & Cool Things to Test**:
   - Both mature tools and experimental/indie projects with potential or curiosity value are happily welcomed.
4. **⭐ Star the Repository**:
   - If you find this project helpful or want to help your tool reach more devs, leave a star ⭐ on GitHub!
5. **🚀 Fast-Track for Creators & Authors**:
   - Built the tool yourself? **Introduce yourself in the PR!** Share a quick summary of what it does and why you built it. We love supporting creators with direct fast-track validation.
6. **📸 Screenshot (Optional)**:
   - Attaching a quick preview image helps us verify and appreciate the tool faster.

---

## 🚀 Workflow: Adding a New Link

We follow a **"README-as-Database"** design. You don't need to write code:

1. **Fork** the repository and create a new branch:
   ```bash
   git checkout -b resource/my-new-tool
   ```
2. **Open** `README.md` at the project root.
3. **Find the appropriate category** (e.g., `### IA`, `### Herramientas`, `### Iconos`, `### CSS`, etc.).
4. **Add your link** using standard Markdown:
   ```markdown
   - [Resource Name](https://resource-url.com)
   ```
5. **Commit your changes** and open a Pull Request.

---

## 📋 Pull Request Template (In Spanish)

Please use this structure (in Spanish) when opening your PR:

```markdown
### 📝 Descripción del Recurso
- **Nombre:** [Tool / Resource Name]
- **URL:** [https://...]
- **Categoría propuesta en README.md:** [e.g. IA, Iconos, CSS, Productividad, Utilidades]
- **Tipo de recurso:** [ ] Herramienta consolidada / [ ] Proyecto nuevo/experimental interesante para probar
- **¿De qué trata? (Breve descripción):** [1-2 sentences on what it does and why it's interesting]

### 👤 Información del Contribuidor
- [ ] Soy el creador/autor de este recurso.
- [ ] No soy el creador, pero la encontré/probé y me pareció interesante para la lista.

<!-- If you are the creator, share a short intro here: -->
<!-- Hola, soy [Nombre] y creé este proyecto para... -->

### 📸 Captura de Pantalla (Opcional)
<!-- Drag & drop an image here if desired -->

### ✅ Lista de Verificación (Checklist)
- [ ] He colocado el enlace en la sección adecuada del `README.md`.
- [ ] El enlace utiliza el formato estándar `- [Nombre](URL)`.
- [ ] He comprobado que el enlace funciona correctamente.
- [ ] No contiene publicidad invasiva ni elementos maliciosos.
- [ ] He dejado una estrellita ⭐ al repositorio.
- [ ] El PR está redactado en español.
```

---

## 💻 Local Development & Setup

```bash
cd web
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view live changes dynamically loaded from `README.md`.

---

## ☁️ Deployment

- **Hosting Platform:** Netlify / Vercel
- **Root / Base directory:** `web`
- **Build Command:** `pnpm build`
- **Publish Directory:** `web/out` (or `.next`)
