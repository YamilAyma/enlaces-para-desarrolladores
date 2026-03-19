---
description: Protocolo de inicio y flujo de trabajo para agentes de IA en el proyecto Enlaces para Desarrolladores.
---

Este workflow debe ser ejecutado al inicio de cada sesión de trabajo con el proyecto para garantizar la integridad de la arquitectura y el diseño.

1. **Fase de Sincronización:**
   - Visualiza el archivo principal de datos: [README.md](../../README.md).
   - Verifica que el formato de los enlaces sea: `- [Nombre](URL): Descripción`.

2. **Fase de Identidad Visual (Skill: brand-identity):**
   - Antes de cualquier cambio en la UI o textos, lee el skill `brand-identity` en `.agent/skills/brand-identity/SKILL.md`.
   - Asegura que se respeta el color primario Acid Green (`#CAFC00`).

3. **Fase de Desarrollo:**
   - Trabaja exclusivamente en el directorio `web/` para cambios en la aplicación React/Next.js.
   - Si creas nuevas entradas, hazlo directamente en el `README.md`.

4. **Fase de IA-Friendly (llms.txt):**
   - Si modificas el contenido del `README.md`, DEBES actualizar el archivo `llms.txt`.
   // turbo
   - Ejecuta: `npm run generate-llms` desde la carpeta `web/`.

5. **Fase de Verificación:**
   // turbo
   - Ejecuta `npm run build` en `web/` para verificar tipos, linting e integridad de rutas estáticas.
   - Si hay errores en las URLs, revisa `web/lib/data.ts`.
