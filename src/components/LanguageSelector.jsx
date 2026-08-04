import { useState } from "react";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "as", label: "Assamese", short: "AS" },
  { code: "bn", label: "Bengali", short: "BN" },
  { code: "brx", label: "Bodo", short: "BRX" },
  { code: "bho", label: "Bhojpuri", short: "BHO" },
  { code: "doi", label: "Dogri", short: "DOI" },
  { code: "gu", label: "Gujarati", short: "GU" },
  { code: "hi", label: "Hindi", short: "HI" },
  { code: "kn", label: "Kannada", short: "KN" },
  { code: "kha", label: "Khasi", short: "KHA" },
  { code: "kok", label: "Konkani", short: "KOK" },
  { code: "trp", label: "Kokborok", short: "TRP" },
  { code: "mai", label: "Maithili", short: "MAI" },
  { code: "ml", label: "Malayalam", short: "ML" },
  { code: "mni", label: "Manipuri (Meiteilon)", short: "MNI" },
  { code: "mr", label: "Marathi", short: "MR" },
  { code: "or", label: "Odia (Oriya)", short: "OR" },
  { code: "pa", label: "Punjabi", short: "PA" },
  { code: "sa", label: "Sanskrit", short: "SA" },
  { code: "sat", label: "Santali", short: "SAT" },
  { code: "ta", label: "Tamil", short: "TA" },
  { code: "te", label: "Telugu", short: "TE" },
  { code: "ur", label: "Urdu", short: "UR" },
  { code: "awa", label: "Awadhi", short: "AWA" },
  { code: "mwr", label: "Marwari", short: "MWR" },
  { code: "tcy", label: "Tulu", short: "TCY" },
  { code: "lus", label: "Mizo", short: "LUS" },
];

export default function LanguageSelector() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const changeLanguage = (newLang) => {
    if (newLang === lang) return;

    setLang(newLang);
    localStorage.setItem("lang", newLang);

    const value = newLang === "en" ? "/en/en" : `/en/${newLang}`;

    // Remove previous cookie
    document.cookie = "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";

    // Set new cookie
    document.cookie = `googtrans=${value};path=/`;

    // Force Google Translate to re-read cookie
    window.location.reload();
  };

  return (
    <div className="relative inline-block">
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="border border-[#0B1E2A] text-[rgba(11,30,42,0.9)] font-medium tracking-normal w-20 rounded-full px-4 lg:px-2 lg:pr-5 xl:pr-5 xl:px-3 py-0.5 lg:py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none text-sm lg:text-xs"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-1 top-0 lg:-top-[0.05rem] translate-y-1/2 w-3.5 h-3.5 text-gray-700 pointer-events-none" />
    </div>
  );
}
