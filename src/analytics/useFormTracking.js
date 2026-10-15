import { useEffect } from "react";
import ReactGA from "react-ga4";
import { generateAnalyticsId } from "./analytics";

export function useFormTracking() {
  useEffect(() => {
    const startedForms = new WeakSet();

    function getFormName(form) {
      return (
        form.getAttribute("data-analytics-name") ||
        form.getAttribute("aria-label") ||
        form.getAttribute("name") ||
        form.querySelector("legend, h1, h2, h3")?.textContent?.trim() ||
        "Unknown Form"
      );
    }

    function getFormId(form) {
      const label =
        form.getAttribute("data-analytics-id") ||
        form.getAttribute("aria-label") ||
        form.getAttribute("name") ||
        form.querySelector("legend, h1, h2, h3")?.textContent?.trim() ||
        "";

      return generateAnalyticsId(label) || "unknown_form";
    }

    function handleFormStart(event) {
      if (!(event.target instanceof Element)) return;

      const form = event.target.closest("form");

      if (!form || startedForms.has(form)) return;

      if (form.hasAttribute("data-no-track")) return;

      startedForms.add(form);

      ReactGA.event("form_start", {
        form_id: getFormId(form),
        form_name: getFormName(form),
      });
    }

    function handleFormSubmit(event) {
      const form = event.target;

      if (!(form instanceof HTMLFormElement)) return;

      if (form.hasAttribute("data-no-track")) return;

      ReactGA.event("form_submit", {
        form_id: getFormId(form),
        form_name: getFormName(form),
      });
    }

    document.addEventListener("focusin", handleFormStart);
    document.addEventListener("input", handleFormStart);
    document.addEventListener("submit", handleFormSubmit, true);

    return () => {
      document.removeEventListener("focusin", handleFormStart);
      document.removeEventListener("input", handleFormStart);
      document.removeEventListener("submit", handleFormSubmit, true);
    };
  }, []);
}
