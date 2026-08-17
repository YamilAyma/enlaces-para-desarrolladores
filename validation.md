# 🧪 Protocolo de Pruebas Manuales y Validación Local

Este documento detalla el paso a paso para probar y validar **de forma 100% segura en tu entorno local** la infraestructura de posts diarios, el feed RSS y la compatibilidad con Make.com antes de poner en marcha la publicación automática en LinkedIn.

---

## 🎯 Objetivo de las Pruebas
1. Verificar que tus posts diarios con fechas futuras **NO** se filtren antes de tiempo.
2. Comprobar que un post con fecha de **HOY** o anterior aparezca de inmediato en `/posts/rss.xml`.
3. Validar que `<content:encoded>` contenga el cuerpo del post formateado con `<br/>` dentro de un bloque `<![CDATA[ ... ]]>`.
4. Validar que la portada `<enclosure>` y `<media:content>` tenga la URL absoluta correcta.
5. Probar el módulo de Make.com de forma aislada sin publicar en LinkedIn o usando un canal de pruebas.

---

## 📋 Checklist Paso a Paso

### Paso 1: Iniciar el Servidor de Desarrollo
En una terminal en la carpeta `web/`:
```bash
pnpm run dev
```
Abre en tu navegador `http://localhost:3000` para comprobar que la web carga correctamente.

---

### Paso 2: Crear un Post de Prueba Local
Crea un archivo temporal en `web/content/posts/` para validar el comportamiento:

**Nombre del archivo:** `web/content/posts/recursos-test-hoy.md`
```markdown
---
title: "Recursos para Desarrolladores - Test"
image: "/og/posts/animaciones-sombras-css-micro-interacciones-web.webp"
imageAlt: "Prueba de post de recursos"
copy: "Recursos de prueba: Herramienta A, Herramienta B, Herramienta C"
category: "General"
date: "2026-08-16"
published: true
tags:
  - posts
  - test
---

Iniciamos la jornada con 3 recursos destacados.

---

Herramienta A: Descripción de prueba de la primera herramienta.
Link: https://github.com

Herramienta B: Descripción de prueba de la segunda herramienta.
Link: https://example.com

Herramienta C: Descripción de prueba de la tercera herramienta.
Link: https://example.org

---

🤖 Nota: Soy un bot programado para ayudarte a mantenerte al día.
```

---

### Paso 3: Inspeccionar el Feed RSS Local
1. Abre en tu navegador o cliente HTTP (Postman / Thunder Client / cURL):
   ```
   http://localhost:3000/posts/rss.xml
   ```
2. **Puntos de Validación en el XML generado:**
   - [ ] **Presencia del Post:** El ítem `Recursos para Desarrolladores - Test` debe aparecer en el feed.
   - [ ] **Etiqueta `<content:encoded>`:** Debe contener el texto dentro de `<![CDATA[ ... ]]>` con saltos delimitados por `<br/>`:
     ```xml
     <content:encoded><![CDATA[Iniciamos la jornada con 3 recursos destacados.<br/><br/>---<br/><br/>Herramienta A: Descripción...]]></content:encoded>
     ```
   - [ ] **Etiqueta `<description>`:** Debe contener el copy corto (`Recursos de prueba: Herramienta A...`).
   - [ ] **Etiqueta `<pubDate>`:** Debe estar en formato RFC 822 (ej. `Sun, 16 Aug 2026 00:00:00 GMT`).
   - [ ] **Etiqueta `<enclosure>` y `<media:content>`:**
     ```xml
     <enclosure url="https://enlaces-para-desarrolladores.netlify.app/og/posts/animaciones-sombras-css-micro-interacciones-web.webp" length="0" type="image/webp" />
     <media:content url="https://enlaces-para-desarrolladores.netlify.app/og/posts/animaciones-sombras-css-micro-interacciones-web.webp" medium="image" type="image/webp">
       <media:description type="plain">Prueba de post de recursos</media:description>
     </media:content>
     ```

---

### Paso 4: Validar el Filtro de Publicación Futura (Lote)
1. Modifica la fecha en el frontmatter de tu archivo de prueba a una fecha futura:
   ```yaml
   date: "2029-01-01"
   ```
2. Recarga `http://localhost:3000/posts/rss.xml` y `http://localhost:3000/blog`.
3. **Punto de Validación:**
   - [ ] El post `recursos-test-hoy` **NO DEBE APARECER** en el RSS ni en el listado del blog. Esto confirma que puedes subir lotes de 30 o 60 días sin riesgo de publicación prematura.

---

### Paso 5: Probar en Make.com de Forma Segura

Para probar tu escenario de Make sin que se publique directamente en LinkedIn:

1. **Opción A (Recomendada - Desconectar LinkedIn temporalmente):**
   - En tu escenario de Make, añade después del módulo RSS un módulo **Tools > Set Variable** o **Slack / Telegram / Correo** temporal para inspeccionar la salida.
   - O activa el botón **"Run once"** en Make apuntando al feed local (usando *ngrok* / *localtunnel* si pruebas contra localhost, o tras desplegar a una rama/preview de Netlify).
2. **Opción B (Transformación de `<br/>` en Make):**
   - Verifica en Make que tu paso auxiliar de transformación:
     ```text
     replace({{content:encoded}}; <br/>; newline)
     ```
     reciba el texto limpio y lo transforme en saltos de línea legibles para el cuerpo del mensaje.
3. **Opción C (Prueba en LinkedIn Company Page):**
   - Puedes hacer un primer test con visibilidad restringida o en una página de pruebas de LinkedIn antes de activar el trigger programado.

---

### Paso 6: Limpieza
Una vez confirmadas las pruebas:
- Elimina el post de prueba `web/content/posts/recursos-test-hoy.md`.
