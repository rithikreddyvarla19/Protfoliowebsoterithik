const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
const hubSpotPortalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;

export function initAnalytics() {
  if (typeof window === "undefined") return;

  if (measurementId) {
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

  if (clarityProjectId) {
    window.clarity = function clarity() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarityProjectId}`;
    document.head.appendChild(script);
  }

  if (hubSpotPortalId) {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.id = "hs-script-loader";
    script.src = `https://js-na2.hs-scripts.com/${hubSpotPortalId}.js`;
    document.body.appendChild(script);
  }
}

export function trackEvent(action, params = {}) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, params);
}
