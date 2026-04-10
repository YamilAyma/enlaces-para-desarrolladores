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
Identificar la sección más adecuada según la naturaleza del recurso:
- `🖥️ Técnico`: Frameworks complejos, agentes de IA, herramientas de arquitectura.
- `🛠️ HERRAMIENTAS`: CLI, utilidades de sistema, gestores de paquetes, SaaS de productividad.
- `⭐ PACKS DE COMPONENTES y LIBRERIAS`: Componentes UI, hooks, librerías de estilos.
- `🌐 WEB`: Recursos ligeros, animaciones CSS/JS, efectos visuales.
- `📚 DOCUMENTACIÓN UTIL`: Referencias, cheatsheets, visualizadores educativos.
- `APIs`: Servicios externos consumibles vía HTTP.
- `📒 CURSOS`: Plataformas de aprendizaje, laboratorios interactivos.

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
