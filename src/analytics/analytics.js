import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-HLKKNQK0NY";

export function initAnalytics() {
  ReactGA.initialize(MEASUREMENT_ID, {
    gtagOptions: {
      send_page_view: false,
      debug_mode: true,
    },
  });
}

export function trackEvent(eventName, parameters = {}) {
  ReactGA.event(eventName, {
    ...parameters,
    debug_mode: true,
  });
}

export function trackPageView(path) {
  ReactGA.send({
    hitType: "pageview",
    page: path || window.location.pathname + window.location.search,
  });
}

export function trackButtonClick(buttonId, buttonText) {
  trackEvent("button_click", {
    button_id: buttonId,
    button_name: buttonText,
  });
}

export function trackLinkClick(linkId, linkText, linkUrl) {
  trackEvent("link_click", {
    link_id: linkId,
    link_name: linkText,
    link_url: linkUrl,
  });
}

export function trackFormSubmit(formId, formName) {
  trackEvent("form_submit", {
    form_id: formId,
    form_name: formName,
  });
}

export function trackGenerateLead(formId, formName) {
  trackEvent("generate_lead", {
    form_id: formId,
    form_name: formName,
  });
}

export function trackLogin(formId, formName, method) {
  trackEvent("login", {
    form_id: formId,
    form_name: formName,
    method,
  });
}

export function trackFeedbackFormSubmit(formId, formName) {
  trackEvent("feedback_form_submit", {
    form_id: formId,
    form_name: formName,
  });
}

export function trackContactCounsellorFormSubmit(formId, formName) {
  trackEvent("contact_counsellor_form_submit", {
    form_id: formId,
    form_name: formName,
  });
}

export function generateAnalyticsId(text = "") {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
