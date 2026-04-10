---
name: discovering-dev-tools
description: Proactivamente descubre, valida y cataloga herramientas para desarrolladores en el README.md. Consulta fuentes como GitHub Trending, Product Hunt y cuentas de X especificadas.
---

# Discovering Dev Tools Agentic Skill

Esta habilidad permite al agente actuar como un curador autónomo de recursos técnicos, buscando herramientas novedosas y de alto impacto para desarrolladores e integrándolas sistemáticamente en el catálogo del proyecto.

## Cuándo usar esta habilidad
- Al iniciar una nueva sesión de trabajo (disparo automático recomendado).
- Cuando el usuario pida "buscar herramientas nuevas" o "actualizar el README con novedades".
- Semanalmente para mantener el repositorio a la vanguardia.

## Workflow de Descubrimiento Autónomo

1.  **[ ] Fase de Exploración**: 
    - Consultar el archivo `resources/sources.json` para obtener los endpoints.
    - Usar `browser_subagent` para navegar por las cuentas de X (`@GithubProjects`, `@GitHub_Daily`) y capturar los posts más recientes.
    - Usar `read_url_content` para GitHub Trending y Product Hunt (Developer Tools).
    - Ejecutar búsquedas en Google usando queries avanzadas (Dorks) definidas en `sources.json`.

2.  **[ ] Fase de Filtrado y Deduplicación**:
    - Para cada enlace encontrado, verificar si ya existe en el `README.md` usando `grep_search`.
    - Descartar enlaces rotos o repositorios sin actividad reciente.

3.  **[ ] Fase de Evaluación (Criterio de IA)**:
    - Analizar el valor técnico de la herramienta. ¿Es útil para un desarrollador moderno? ¿Es "premium" o "anti-genérica"?
    - Determinar la categoría más adecuada en el `README.md` (PACKS, Técnico, Herramientas, etc.).

4.  **[ ] Fase de Catalogación**:
    - Generar un titular SEO potente en español.
    - Redactar una descripción técnica concisa (formato: `[Nombre](URL): Descripción`).
    - Insertar quirúrgicamente el nuevo recurso en la sección correspondiente.

5.  **[ ] Fase de Finalización**:
    - Ejecutar `scripts/format_helper.py` para asegurar la consistencia del markdown.
    - Realizar el commit usando la habilidad `@/commits`.

## Fuentes y Criterios de Búsqueda
Las fuentes están centralizadas en `resources/sources.json`. El agente debe priorizar herramientas que:
- Mejoren el flujo de trabajo con agentes de IA (MCP servers, Agent skills).
- Sean frameworks modernos de frontend o backend.
- Ofrezcan recursos gratuitos (Open Source o Generosos "Free for Dev").

## Instrucciones para el Agente
- **NO duplicar**: Si el nombre o URL ya existen, sáltalo.
- **Calidad sobre Cantidad**: Es mejor añadir 3 herramientas increíbles que 10 mediocres.
- **Formato Estricto**: Mantener siempre el esquema `### Categoría \n - [Nombre](URL): Descripción`.

## Recursos
- [Sources Config](resources/sources.json)
- [Format Helper](scripts/format_helper.py)
