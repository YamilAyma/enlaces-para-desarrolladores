---
version: alpha
name: Enlaces para Desarrolladores
description: Catálogo técnico de alta densidad, texto primero y detalles bajo demanda. Documenta la interfaz existente y orienta nuevas superficies sin rediseñarla.
colors:
  primary: "#CAFC00"
  on-primary: "#2A2A2A"
  background: "#000000"
  foreground: "#EDEDED"
  secondary: "#A1A1AA"
  surface: "#18181B"
  border: "#27272A"
  white: "#FFFFFF"
  global-background: "#3A3A3A"
  global-background-light-preference: "#2E2E2E"
  subtle-surface: "rgba(255, 255, 255, 0.05)"
  subtle-border: "rgba(255, 255, 255, 0.10)"
  monitor-background: "#F7F7F2"
  monitor-surface: "#FFFEFA"
  monitor-text: "#213A35"
  monitor-secondary: "#64766C"
  monitor-border: "#DCE3D8"
  monitor-dark-background: "#101612"
  monitor-dark-surface: "#18211B"
  monitor-dark-text: "#E9EFE8"
  monitor-dark-secondary: "#AFBDAF"
  monitor-dark-border: "#34483B"
  monitor-dark-action: "#C9F56B"
  extension-background: "#101612"
  extension-text: "#E9EFE8"
  extension-action: "#C9F56B"
typography:
  body:
    fontFamily: "Roboto, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  compact-description:
    fontFamily: "Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.625
  compact-title:
    fontFamily: "Roboto, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: -0.025em
  section-title:
    fontFamily: "Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.428571
  control:
    fontFamily: "Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.428571
  technical-label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.1em
  filter-label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.333333
  operation-body:
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  row: 6px
  input: 8px
  card: 12px
  dialog: 16px
  pill: 9999px
spacing:
  micro: 4px
  tight: 8px
  inline: 10px
  compact: 12px
  normal: 16px
  group: 24px
  section: 40px
  category: 48px
components:
  catalog-page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
  resource-row:
    typography: "{typography.compact-title}"
    rounded: "{rounded.row}"
    padding: "{spacing.compact}"
  resource-description:
    typography: "{typography.compact-description}"
    textColor: "{colors.secondary}"
  category-heading:
    typography: "{typography.section-title}"
  technical-label:
    typography: "{typography.technical-label}"
  search:
    typography: "{typography.control}"
    rounded: "{rounded.input}"
  filter-chip:
    typography: "{typography.filter-label}"
    rounded: "{rounded.row}"
  header-action:
    backgroundColor: "{colors.subtle-surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
  header-action-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
  monitor-panel:
    backgroundColor: "{colors.monitor-surface}"
    textColor: "{colors.monitor-text}"
    typography: "{typography.operation-body}"
  extension-settings:
    backgroundColor: "{colors.extension-background}"
    textColor: "{colors.extension-text}"
    typography: "{typography.operation-body}"
  monitor-panel-dark:
    backgroundColor: "{colors.monitor-dark-surface}"
    textColor: "{colors.monitor-dark-text}"
    typography: "{typography.operation-body}"
---

# Enlaces para Desarrolladores — guía de interfaces

## Overview

### Intención y alcance

Un directorio para explorar muchos recursos con poco esfuerzo: **texto primero, alta densidad legible, acciones discretas y detalle bajo demanda**. El contenido debe poder recorrerse como un índice, sin que cada enlace compita por atención con un contenedor propio. La personalidad es técnica, sobria y directa; el color aporta orientación.

Esta guía corresponde al sitio público y orienta las interfaces asociadas: catálogo, categorías, artículos, archivo, monitor local y extensión. El sitio público es la referencia visual principal; las otras superficies conservan sus perfiles actuales. Compartir criterios de jerarquía, densidad y comportamiento no implica imponerles una misma paleta.

### Cómo aplicar el archivo

Antes de crear o modificar una interfaz, identificar su superficie y leer el componente equivalente. Reutilizar su patrón antes de introducir otro. Los tokens describen valores de referencia; las clases y variantes ya existentes precisan cada contexto. No convertir este documento en CSS ni sustituir variables en bloque.

**Añadir este archivo no cambia el sitio.** Una petición de interfaz nueva tampoco autoriza a retocar páginas existentes, fuentes, categorías, disposición, contenido, dependencias o preferencias guardadas. Si hay discrepancias entre esta guía y el código, verificar la superficie afectada y actualizar la documentación o proponer un cambio acotado; evitar normalizaciones automáticas.

### Evidencia y fuentes

Referencia revisada el **16 de octubre de 2026**: [sitio público](https://enlaces-para-desarrolladores.netlify.app/), captura del propietario y código del checkout local. Son evidencia de la interfaz; no se presupone que cada revisión local esté desplegada.

La estructura sigue el [formato DESIGN.md de Google Labs](https://github.com/google-labs-code/design.md) y su [especificación alpha](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md): tokens YAML y criterios en Markdown, con las ocho secciones canónicas. Este uso del formato no exige adoptar Material Design, instalar Stitch ni cambiar el stack.

| Referencia local al repositorio | Qué consultar |
| --- | --- |
| `web/app/globals.css`, `web/app/layout.tsx` | Variables globales, Roboto y familias auxiliares. |
| `web/app/page.tsx` | Fondo negro del catálogo y contenedor principal. |
| `web/components/gallery-clientside.tsx` | Búsqueda, filtros, columnas y carga incremental. |
| `web/components/link-row.tsx`, `web/lib/colors.ts` | Fila compacta y asignación de color a categorías. |
| `web/components/site-header.tsx`, `web/components/command-palette.tsx` | Navegación y acceso rápido. |
| `web/components/posts-archive.tsx`, `web/app/blog/[slug]/page.tsx` | Tarjetas editoriales, lectura extensa y detalle. |

El monitor PHP y la extensión viven en la infraestructura local asociada, fuera de este repositorio público. Sus archivos `monitor.css`, `monitor.js`, `background.js` y `options.html` definen sus variantes actuales; no introducir sus datos privados ni rutas de instalación en el frontend público.

## Colors

### Perfil del sitio público

Base oscura, texto claro y bordes sutiles. El catálogo usa negro explícito en `web/app/page.tsx`; los valores globales `#3A3A3A` y `#2E2E2E` siguen existiendo para otros contextos. No reemplazar uno por otro ni interpretar la preferencia clara del sistema como permiso para generar un tema claro.

`primary` es el **acento lima `#CAFC00`**, no el color de todo el texto ni el fondo de todas las acciones. Se usa en selección, foco, enlaces destacados y algunos estados interactivos. La cabecera mantiene acciones neutras en reposo y puede usar lima al pasar el cursor. Un filtro activo del catálogo usa la variante clara existente; no teñirlo de lima por uniformidad.

El texto principal, las descripciones, los contadores y los bordes tienen jerarquías diferentes. Conservar las utilidades `text-zinc-*`, `bg-zinc-*` y sus transparencias en los componentes actuales; los tokens globales no sustituyen sus matices. `secondary` documenta `--muted-foreground`, no una obligación de aplicar ese único gris a toda la página.

### Categorías y estados

`getCategoryColor()` es la fuente de asignación: morado para frontend/diseño; ámbar para IA; esmeralda para backend/APIs; cian para infraestructura; rosa para datos; naranja como alternativa general. Las reglas tienen orden y usan nombres: reutilizar la función, sin deducir una taxonomía nueva a partir del color de una captura. Las tonalidades exactas de los puntos dependen de las utilidades Tailwind instaladas; sus halos están declarados explícitamente en esa función.

Los colores de categoría son orientación, no estados operativos. Un punto naranja de herramientas no significa error. Un estado debe tener texto o icono reconocible además de color. Los grises muy tenues existentes en elementos decorativos no sirven como referencia para texto esencial nuevo.

### Perfiles asociados

| Superficie | Referencia que debe conservarse |
| --- | --- |
| Monitor local | Fondo `#F7F7F2`, panel `#FFFEFA`, texto `#213A35`, secundario `#64766C`, borde `#DCE3D8`. Usar su CSS actual, sin aplicarle el negro del catálogo. |
| Monitor oscuro, selección explícita | Fondo `#101612`, panel `#18211B`, texto `#E9EFE8`, secundario `#AFBDAF`, borde `#34483B`, acción `#C9F56B`. Mantiene la misma estructura y densidad del perfil claro. |
| Opciones de extensión | Fondo `#101612`, texto `#E9EFE8`, botones `#C9F56B`, tipografía de sistema. |
| Vista flotante de captura | Panel claro `#FFFDF7` y texto oscuro `#182923`, contenido encapsulado en Shadow DOM. No heredar estilos de la web visitada. |
| Icono de extensión | `YA` para coincidencia, `?` para comprobación no disponible, distintivo vacío para URL ausente; el título al pasar el cursor explica el resultado. |

La elección claro/oscuro del monitor se guarda en `localStorage` bajo `enlaces-monitor-theme`. Se aplica antes de pintar la página; sin preferencia válida se conserva el tema claro. Si el almacenamiento no está disponible, el selector funciona durante la visita. El cambio de tema no afecta datos, estados ni publicaciones.

## Typography


Roboto es la familia principal del sitio, con la configuración existente de `next/font`. La familia monoespaciada del sistema identifica filtros, cifras y etiquetas técnicas. No añadir fuentes para nuevas pantallas relacionadas. Las familias serif declaradas en CSS son una opción existente para contextos editoriales que ya la usen, no la familia del catálogo.

La fila actual usa títulos de 12 px en móvil y 13 px desde `sm`, con peso semibold; descripciones de 12 px y encabezados de categoría de 14 px. Los títulos editoriales pueden ser mayores según la página. Los pesos de los tokens expresan intención visual; no modificar la carga actual de fuentes solo para hacerlos coincidir.

La densidad se obtiene reduciendo contenedores y repetición, **no encogiendo indefinidamente la letra**. Mantener el texto seleccionable, el zoom del navegador y una altura de línea legible. No aplicar los 12 px del índice a párrafos de lectura extensa: los artículos usan cuerpo de 16–18 px y mayor ritmo vertical.

Usar español claro en nuevas instrucciones y estados, manteniendo los nombres propios de herramientas. Etiquetas breves, verbos concretos y fechas inequívocas. No traducir controles existentes como parte incidental de otra tarea. Separar «Registro», «Procesado», «Incluida en PR» y «Fusionada»: representan hechos distintos.

## Layout

### Elegir la forma según el contenido

| Contenido o tarea | Forma preferida | Regla de densidad |
| --- | --- | --- |
| Muchos recursos homogéneos | Filas de texto agrupadas por categoría. | Título, separador y descripción en línea; acciones al extremo. |
| Explicación o guía | Prosa libre con subtítulos y enlaces. | Agrupar ideas relacionadas; evitar una tarjeta por frase. |
| Comparación de campos repetidos | Tabla compacta o lista con campos alineados. | Mantener columnas útiles; adaptar a móvil sin comprimir texto esencial. |
| Captura, ejecución o diagnóstico extenso | Resumen desplegable. | Estado y fechas visibles; JSON, traza y texto completo bajo demanda. |
| Artículo con portada y resumen | Tarjeta editorial existente. | La imagen aporta contexto; este patrón no reemplaza el índice de recursos. |
| Acciones y comandos | Bloque agrupado, comando visible y controles próximos. | Copiar y ejecutar son acciones distintas; no esconder el comando detrás del botón. |

### Catálogo

El contenedor actual es `max-w-7xl` (80 rem), centrado, con márgenes interiores de 16/24/32 px según el ancho. La cuadrícula usa **1 columna, 2 desde `md` y 3 desde `lg`**, con separaciones de 12 px entre columnas y 4 px entre filas. Se mantiene el orden del contenido; no usar masonry que cambie el recorrido de lectura.

Con Tailwind sin personalización de breakpoints, `sm`, `md` y `lg` corresponden a 640, 768 y 1024 px. Verificar la configuración vigente antes de usarlos como valores absolutos. El espacio entre categorías es mayor que el espacio entre recursos. No cerrar todas las categorías en tarjetas ni añadir bordes permanentes a cada fila.

La cabecera fija mantiene búsqueda y navegación, y el contenido respeta su espacio. Preservar el hero y los márgenes actuales aunque una captura muestre solo el catálogo. La búsqueda principal precede a los filtros; los chips pueden desplazarse horizontalmente sin provocar desplazamiento horizontal de toda la página.

### Resumen y detalle

Aplicación al monitor aprobada el 16/10/2026: contadores en una franja sin tarjetas individuales; capturas y ejecuciones en filas con divisores y resumen desplegable; fechas y estados visibles; tamaño de extracción, encabezados, texto, JSON y etapas en el detalle. La gestión mantiene comandos y botones visibles; las explicaciones auxiliares usan prosa y desplegables. Se conserva la paleta clara y la tipografía de sistema del monitor.

La fila de recurso es una línea continua: punto de categoría, nombre, `·`, descripción y acciones discretas. La descripción puede truncarse visualmente; conservar siempre el texto completo en los datos. La implementación actual lo expone mediante `title`, que no es suficiente como único acceso en pantallas táctiles o por teclado: en componentes nuevos, ofrecer detalle accesible sin depender solo del hover.

Un nombre o URL largo no debe expulsar los controles fuera del contenedor. Para una variante nueva, permitir ajuste de línea o detalle; no ocultar acciones esenciales ni destruir la rejilla. Los comandos pueden envolver líneas; JSON y trazas pueden desplazarse dentro de su propio bloque. Las fechas y decisiones necesarias para actuar permanecen visibles en el resumen.

## Elevation & Depth

Priorizar fondo, contraste, espacio y divisores finos para expresar jerarquía. Las filas tienen borde transparente en reposo y realce leve en hover. Los puntos de categoría admiten el halo pequeño ya definido; no extenderlo a toda la fila ni generar grandes degradados decorativos.

Reservar sombras y desenfoque para superficies superpuestas: cabecera al desplazarse, paleta de comandos, diálogos y vista flotante de la extensión. Mantener las capas existentes: no elevar elementos ordinarios por encima de navegación o diálogos.

Las transiciones habituales son de 150–200 ms; algunas superficies editoriales y la cabecera usan 300 ms. Respetar el movimiento reducido en componentes nuevos. No añadir animaciones continuas para comunicar estados normales ni animar la entrada de cada recurso de una lista extensa.

## Shapes

Filas y chips del catálogo: radio de 6 px. Búsqueda principal: 8 px. Tarjetas editoriales: 12 px. Diálogos: 16 px. Búsqueda de cabecera y acciones de cabecera: píldora. Estas diferencias señalan funciones distintas; no uniformar todos los radios.

Los tokens de espaciado y `padding` de componente expresan medidas simples. La fila existente precisa 12 px horizontales y 8 px verticales; no convertir `padding: 12px` del token en un aumento automático de su altura. El monitor conserva sus radios actuales de panel y control, definidos en su propia hoja.

## Components

### Fila de recurso

Reutilizar `LinkRow` y `getCategoryColor`. Mantener título visible, descripción secundaria y orden estable. El estado favorito debe reconocerse sin depender de hover. Navegar al recurso y marcar favorito son acciones diferentes: en componentes nuevos, usar controles hermanos y semántica válida; no copiar la anidación de un botón dentro de un enlace como patrón recomendado. Esta guía registra esa limitación sin refactorizar el componente existente.

### Búsqueda, filtros y carga

Conservar la búsqueda por texto y el estado de URL que ya usa la página. Los filtros deben expresar su selección visual y semánticamente. Mantener acceso por `/` donde ya exista y `Ctrl/Cmd + K` para la paleta; los atajos no deben interceptar escritura en campos. La paleta admite teclado y Escape. Una nueva superficie modal debe gestionar foco y devolverlo al control que la abrió.

La carga incremental usa la configuración vigente del sitio, no cantidades copiadas de una captura. Durante un filtro, evitar saltos de altura y pérdida de contexto. Una lista vacía debe indicar qué búsqueda o filtro produjo el resultado y ofrecer una forma de restablecerlo.

### Importación de lotes curados

La pestaña Importar del monitor usa un único campo de texto y Enviar a pendientes. Acepta Markdown y el pegado enriquecido de listas con enlaces; conserva las URLs del portapapeles sin renderizar el HTML pegado. Si se edita el texto, descarta el HTML previo para evitar enviar una versión distinta a la visible y pide incluir las URLs en Markdown.

El envío muestra una lista compacta por elemento y cifras de añadidos, pendientes completados, duplicados y errores. Mantener el texto ante un fallo para poder reintentar. El envío no inicia un PR. Una captura web pendiente puede completarse con texto curado conservando ID, fechas, extracción y una copia de los textos anteriores; un pendiente ya curado no se sobrescribe. Las URLs ausentes se señalan, nunca se adivinan. El origen Lote curado identifica contenido que solo requiere clasificación y cuya redacción se conserva.

### Acciones y feedback

Preferir una acción principal clara por grupo y acciones secundarias discretas. «Copiar» conserva el comando; «Ejecutar ahora» explica su efecto y comunica inicio, resultado o fallo. Deshabilitar acciones repetibles durante su solicitud. Un fallo de conexión nunca equivale a éxito ni a ausencia de datos.

El texto de un estado debe corresponder a la evidencia disponible:

| Estado | Significado que puede comunicar la interfaz |
| --- | --- |
| Pendiente | Captura conservada que todavía requiere procesamiento. |
| Para revisar | Decisión humana pendiente sobre una captura concreta. |
| Incluida en PR | La entrada fue incluida en un PR confirmado; no afirma fusión. |
| Ya existía en README | La URL estaba en el catálogo al comprobarla; no fue creada por ese lote. |
| Descartada como duplicado | Decisión registrada, con respaldo de la captura. |
| Error / no disponible | El resultado no pudo confirmarse; indicar el siguiente paso útil. |

En el monitor, conservar fechas de registro y procesado, historial y contexto de la coincidencia. Los contadores y filtros deben derivar del mismo estado, sin contar como pendiente de revisión una decisión ya resuelta. En la extensión, comprobar una URL automáticamente no debe extraer ni guardar contenido; la captura requiere el clic del usuario. Los avisos del icono deben tener un título explicativo.

### Accesibilidad y casos límite

Toda acción debe tener nombre accesible, foco visible y recorrido por teclado. Exponer estado activo y mensajes asíncronos con semántica adecuada. Los iconos decorativos no sustituyen etiquetas. En controles táctiles nuevos, ampliar el área interactiva antes de aumentar el ruido visual de la lista.

Comprobar contraste en cada combinación real de fondo, transparencia y texto. Los valores existentes son una referencia visual, no una declaración de conformidad accesible. Revisar también títulos largos, descripciones vacías, URLs extensas, cero resultados, carga, fallo de red, teclado, móvil y zoom. El texto esencial y los controles deben seguir siendo utilizables sin hover.

## Do's and Don'ts

| Hacer | Evitar |
| --- | --- |
| Elegir filas para explorar cientos de recursos. | Convertir cada recurso en una tarjeta grande con portada. |
| Usar prosa libre para explicar y desplegables para detalle extenso. | Encajonar cada oración o mostrar JSON completo de entrada. |
| Reutilizar componentes, clases y asignación de categorías. | Crear otra paleta o un nuevo estilo para cada pantalla. |
| Compactar repetición y estructura, conservando lectura y acciones. | Reducir letra o contraste para que quepa más contenido. |
| Conservar el texto original aunque el resumen lo trunque. | Recortar los datos almacenados para resolver un problema visual. |
| Mostrar estado, fecha y siguiente acción cuando importan. | Afirmar «procesado», «guardado» o «fusionado» sin confirmación. |
| Mantener el perfil actual de cada superficie. | Aplicar el tema oscuro público al monitor o recolorear el sitio al documentarlo. |
| Respetar foco, teclado y móvil al añadir controles. | Depender exclusivamente de hover, color o un tooltip. |

### Comprobación antes de entregar una interfaz

1. Identificar superficie, tarea y componente equivalente; justificar un patrón nuevo si hace falta.
2. Contrastar el resultado con la página afectada en escritorio y móvil, usando contenido real largo y breve.
3. Verificar estados, búsqueda, selección, acciones y recuperación ante fallos; comprobar foco y acceso al detalle.
4. Confirmar que no cambiaron otras rutas, estilos globales, datos, favoritos o flujos por accidente.
5. Actualizar esta guía si se aprobó una nueva regla reutilizable, distinguiendo lo implementado de una propuesta.

**Este archivo es documentación:** su creación o lectura no autoriza a modificar interfaces automáticamente. Los cambios de interfaz se ejecutan en tareas explícitas, como la aplicación al monitor registrada arriba. No representa una auditoría WCAG completa ni una migración visual pendiente que deba ejecutarse automáticamente.
