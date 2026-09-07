/**
 * Utilidades de telemetría y eventos para Google Analytics 4 (gtag.js).
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetIdOrAction: string,
      params?: Record<string, unknown> | Date
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Envío genérico seguro de eventos a GA4.
 */
export function sendGAEvent(
  action: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", action, params);
}

/**
 * Registra clics salientes en herramientas y enlaces a recursos externos.
 */
export function trackResourceClick(params: {
  title: string;
  url: string;
  category?: string;
  source?: "link_card" | "link_row" | "command_palette" | "article";
}) {
  sendGAEvent("resource_click", {
    resource_title: params.title,
    resource_url: params.url,
    resource_category: params.category || "General",
    source_component: params.source || "unknown",
  });
}

/**
 * Registra búsquedas realizadas por los usuarios y búsquedas sin resultados.
 */
export function trackSearch(params: {
  query: string;
  resultsCount: number;
  source?: "command_palette" | "gallery_filter";
}) {
  const cleanQuery = params.query.trim();
  if (!cleanQuery) return;

  sendGAEvent("search", {
    search_term: cleanQuery,
    results_count: params.resultsCount,
    source: params.source || "search",
  });

  if (params.resultsCount === 0) {
    sendGAEvent("search_no_results", {
      search_term: cleanQuery,
      source: params.source || "search",
    });
  }
}

/**
 * Registra filtros de categorías seleccionados por el usuario.
 */
export function trackCategoryFilter(category: string, source: string = "gallery") {
  sendGAEvent("filter_category", {
    category_name: category,
    source,
  });
}

/**
 * Registra interacciones de compartir contenido o copiar enlaces.
 */
export function trackShare(params: {
  title: string;
  method: "native_share" | "clipboard";
  url?: string;
}) {
  sendGAEvent("share", {
    content_type: "resource",
    item_id: params.title,
    method: params.method,
    url: params.url,
  });
}

/**
 * Registra adición o eliminación de favoritos en el Toolkit.
 */
export function trackFavoriteToggle(params: {
  title: string;
  url: string;
  action: "add" | "remove";
}) {
  sendGAEvent("favorite_toggle", {
    resource_title: params.title,
    resource_url: params.url,
    action: params.action,
  });
}

/**
 * Registra clics a enlaces externos de comunidad (GitHub, X, Discord, etc.).
 */
export function trackCommunityLink(params: {
  label: string;
  url: string;
  location: "header" | "footer" | "banner" | "contributing";
}) {
  sendGAEvent("community_click", {
    link_label: params.label,
    link_url: params.url,
    click_location: params.location,
  });
}
