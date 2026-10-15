import { useEffect } from "react";

import { generateAnalyticsId, trackLinkClick } from "./analytics";

export function useLinkTracking() {
  useEffect(() => {
    function handleClick(event) {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a");

      if (!link || link.hasAttribute("data-no-track")) return;

      const href = link.getAttribute("href");

      if (!href) return;

      const linkName =
        link.getAttribute("data-analytics-name") ||
        link.getAttribute("aria-label") ||
        link.innerText?.trim() ||
        "Unknown Link";

      const linkId =
        link.getAttribute("data-analytics-id") ||
        generateAnalyticsId(linkName) ||
        "unknown_link";

      trackLinkClick(linkId, linkName, link.href);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}
