import { useEffect, useRef } from "react";

export default function GoogleTranslateProvider() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const init = () => {
      if (initialized.current) return;

      if (!window.google?.translate?.TranslateElement) return;

      initialized.current = true;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element",
      );

      console.log("✅ Google Translate Initialized");
    };

    // Already loaded
    if (window.google?.translate?.TranslateElement) {
      init();
      return;
    }

    window.googleTranslateElementInit = init;

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        console.error("Failed to load Google Translate");
      };

      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "absolute",
        left: "-9999px",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
    />
  );
}
