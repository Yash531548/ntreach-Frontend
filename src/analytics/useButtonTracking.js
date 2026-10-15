import { useEffect } from "react";

import { generateAnalyticsId, trackButtonClick } from "./analytics";

export function useButtonTracking() {
  useEffect(() => {
    function handleClick(event) {
      if (!(event.target instanceof Element)) return;

      const button = event.target.closest(
        'button, input[type="button"], input[type="submit"], [role="button"]',
      );

      if (!button || button.disabled) return;

      if (button.hasAttribute("data-no-track")) return;

      const buttonName =
        button.getAttribute("data-analytics-name") ||
        button.getAttribute("aria-label") ||
        button.innerText?.trim() ||
        button.value ||
        "Unknown Button";

      const buttonId =
        button.getAttribute("data-analytics-id") ||
        generateAnalyticsId(buttonName) ||
        "unknown_button";

      trackButtonClick(buttonId, buttonName);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}
