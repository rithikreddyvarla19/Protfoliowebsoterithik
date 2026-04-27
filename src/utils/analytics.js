const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initAnalytics() {
  if (!measurementId || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    page_path: window.location.pathname,
    page_title: document.title
  });
}

export function trackEvent(action, params = {}) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, params);
}
