import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react' // icons

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'Hindi', short: 'HI' },
  { code: 'fr', label: 'French', short: 'FR' },
  { code: 'es', label: 'Spanish', short: 'ES' }
]
// const languages = [
//   { code: 'en', label: 'English', short: 'EN' },
//   { code: 'as', label: 'Assamese', short: 'AS' },
//   { code: 'bn', label: 'Bengali', short: 'BN' },
//   { code: 'bho', label: 'Bhojpuri', short: 'BHO' },
//   { code: 'doi', label: 'Dogri', short: 'DOI' },
//   { code: 'gu', label: 'Gujarati', short: 'GU' },
//   { code: 'hi', label: 'Hindi', short: 'HI' },
//   { code: 'kn', label: 'Kannada', short: 'KN' },
//   { code: 'kok', label: 'Konkani', short: 'KOK' },
//   { code: 'mai', label: 'Maithili', short: 'MAI' },
//   { code: 'ml', label: 'Malayalam', short: 'ML' },
//   { code: 'mr', label: 'Marathi', short: 'MR' },
//   { code: 'mni', label: 'Meiteilon (Manipuri)', short: 'MNI' },
//   { code: 'or', label: 'Odia (Oriya)', short: 'OR' },
//   { code: 'pa', label: 'Punjabi (Gurmukhi)', short: 'PA' },
//   { code: 'sa', label: 'Sanskrit', short: 'SA' },
//   { code: 'sd', label: 'Sindhi', short: 'SD' },
//   { code: 'ta', label: 'Tamil', short: 'TA' },
//   { code: 'te', label: 'Telugu', short: 'TE' },
//   { code: 'ur', label: 'Urdu', short: 'UR' }
// ];

function LanguageSelector() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')

  // Load Google Translate script once on mount
  useEffect(() => {
    if (!window.google || !window.google.translate) {
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)

      // Global init function
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          'google_translate_element'
        )
      }
    }
  }, [])

  const changeLanguage = (newLang) => {
    if (newLang === lang) return // Avoid unnecessary reload

    localStorage.setItem('lang', newLang)
    setLang(newLang)

    const domain = window.location.hostname
    const cookieValue = newLang === 'en' ? '/en/en' : '/en/' + newLang

    // Clear old googtrans cookies for specific domain and subdomain
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=frontend.72.60.83.68.nip.io`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.nip.io`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

    // Set new googtrans cookies for specific domain and subdomain
    document.cookie = `googtrans=${cookieValue}; path=/; domain=frontend.72.60.83.68.nip.io`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.nip.io`;
    document.cookie = `googtrans=${cookieValue}; path=/`;

    // Only reload if language is changing
    window.location.href = window.location.href.split('#')[0]
  }

  return (
    <>
      <div className="relative inline-block ">
        <select
          value={lang}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border border-[#0B1E2A] text-[rgba(11,30,42,0.9)] font-medium tracking-normal rounded-full px-4 lg:px-2 lg:pr-5 xl:pr-5 xl:px-3 py-0.5 lg:py-1  focus:outline-none focus:ring-2 focus:ring-blue-400 font-redhat appearance-none text-sm lg:text-xs"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-1 top-0 lg:-top-[0.05rem] translate-y-1/2 w-3.5 h-3.5 text-gray-700 pointer-events-none " />
      </div>

      <div id="google_translate_element" className="hidden absolute -z-10"></div>
    </>
  )
}

export default LanguageSelector
