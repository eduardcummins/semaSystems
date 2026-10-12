type Props = Record<string, string | number | boolean>;
declare global {
  interface Window {
    dataLayer?: unknown[];
    plausible?: (event: string, opts?: { props: Props }) => void;
  }
}

/**
 * Sends an event to whichever analytics is installed (Google Tag Manager's dataLayer or Plausible).
 * With neither present it does nothing, so no data leaves the page until a provider is added.
 */
export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...props });
  window.plausible?.(event, { props });
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, props);
}
