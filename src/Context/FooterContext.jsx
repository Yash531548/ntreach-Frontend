import { createContext, useContext } from "react";

export const FooterContext = createContext({ inView: false, height: 0 });
export const useFooter = () => useContext(FooterContext);
// src/Context/FooterContext.jsx
// import { createContext, useContext } from "react";

// export const FooterContext = createContext({ inView: false, height: 0, gap: 0 });
// export const useFooter = () => useContext(FooterContext);
