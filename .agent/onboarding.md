# 🤖 Onboarding para Agentes de IA: Enlaces para Desarrolladores

Bienvenido al proyecto. Este documento es tu guía maestra para entender cómo operar en este repositorio. Está diseñado para ser procesado por LLMs y agentes autónomos.

## 🎯 Esencia del Proyecto
"Enlaces para Desarrolladores" es una proyecto que agrupa recursos técnicos o enlaces de interés para desarrolladores. Su propuesta de valor es la simplicidad y la velocidad, tanto para el usuario final como para el mantenimiento.

## 🏗️ Arquitectura: "README-as-Database"
Este proyecto sigue el patrón **"README-first"**. El archivo `README.md` en la raíz es la **base de datos oficial**.

- **Fuente de Verdad:** [README.md](../README.md).
- **Motor de Datos:** El archivo [web/lib/data.ts](../web/lib/data.ts) parsea el Markdown del README en tiempo real/construcción para generar los objetos JSON que consume la interfaz.
- **Estructura Semántica:** Los enlaces en el README deben seguir el formato `[Nombre](URL): Descripción` para que el motor los procese correctamente.

## 🛠️ Stack Tecnológico
- **Core:** Next.js 16 (Turbopack)
- **Styling:** Tailwind CSS 4 (Modo Oscuro Premium por defecto)
- **Animaciones:** Framer Motion
- **Iconografía:** Lucide React
- **Despliegue:** Preparado para Vercel/Netlify (Base directory: `web`)

## ✨ Características Principales
- **Dark Mode Premium:** Identidad visual basada en negro profundo y verde ácido (`#CAFC00`).
- **OG Dinámico:** Cada categoría genera su propio Open Graph para SEO.
- **Search & Filter:** Filtrado instantáneo por categorías y búsqueda por texto.
- **LLM Friendly:** Archivo `llms.txt` generado automáticamente en cada build para que otras IAs consuman los datos.

## 🧠 Skills del Agente (Habilidades Disponibles)
Como agente, tienes acceso a estas habilidades específicas en `.agent/skills/`:
1.  **brand-identity:** Reglas de oro para colores, tono y voz. **Úsala siempre** antes de proponer cambios visuales o de copy.
2.  **frontend-design:** Guías para crear interfaces tipo "wow".
3.  **frontend-engineering:** Mejores prácticas de ingeniería web y patrones de OG cards.
4.  **error-handling-patterns:** Estándares para manejo de errores resilientes.

## 🚀 Flujo de Trabajo del Agente
Cuando inicies una tarea, sigue este protocolo:
1.  **Contexto:** Lee este Onboarding y revisa el `README.md` si la tarea implica contenido.
2.  **Identidad:** Consulta el skill `brand-identity` para mantener la coherencia estética "Acid Green".
3.  **Implementación:** Realiza los cambios siguiendo los patrones de Next.js 16.
4.  **Sincronización:** Si modificas el README, recuerda ejecutar `npm run generate-llms` (o el build completo) para actualizar el `llms.txt`.
5.  **Verificación:** Asegura que los enlaces se parseen correctamente probando con `npm run build` en la carpeta `web`.

## 📁 Archivos Clave
- [README.md](../README.md): La base de datos.
- [web/app/globals.css](../web/app/globals.css): Sistema de diseño.
- [web/lib/data.ts](../web/lib/data.ts): El "parser" de datos.
- [scripts/](../scripts/): Scripts de soporte y automatización.
