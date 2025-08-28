// import React from 'react'
// import { Outlet } from 'react-router'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

// const Layout = () => {
//     return (
//         <div className="flex flex-col min-h-screen bg-white">
//             <Header className="h-[64px]" />
//             {/* <main className="flex-1 min-h-[calc(100vh-64px-40px)] overflow-y-auto px-4 "> */}
//             <main className="flex-1  overflow-y-auto px-4 ">
//                 < Outlet />{/* Page content will render here */}
//             </main>
//             <Footer className="h-[200px]" />
//         </div>
//     )
// }

// export default Layout
import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FooterContext } from "../Context/FooterContext.jsx";

const Layout = () => {
    const footerRef = useRef(null);
    // const [inView, setInView] = useState(false);
    // const [height, setHeight] = useState(0);
    const [inView, setInView] = useState(false);
    const [height, setHeight] = useState(0);
    const [gap, setGap] = useState(0); // distance from viewport bottom to footer top at moment of intersection

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;

        // initial height + keep it updated on resize
        const setH = () => setHeight(el.getBoundingClientRect().height || 0);
        setH();
        window.addEventListener("resize", setH);

        // observe footer visibility
        const obs = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { root: null, threshold: 0.1 } // fire as soon as footer touches the viewport
        );
        obs.observe(el);

        return () => {
            obs.disconnect();
            window.removeEventListener("resize", setH);
        };
    }, []);

    return (
        // <FooterContext.Provider value={{ inView, height }}>
        <FooterContext.Provider value={{ inView, height, gap }}>
            <div className="flex flex-col min-h-screen bg-white">
                <Header className="h-[64px]" />
                <main className="flex-1 overflow-y-auto px-4">
                    <Outlet />
                </main>

                {/* Wrap footer so we can observe it */}
                <div ref={footerRef}>
                    <Footer className="h-[200px]" />
                </div>
            </div>
        </FooterContext.Provider>
    );
};

export default Layout;
