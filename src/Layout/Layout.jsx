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

const Layout = () => {

    return (

        <div className="flex flex-col min-h-screen bg-white">
            <Header className="h-[64px]" />
            <main className="flex-1 overflow-y-auto px-0">
                <Outlet />
            </main>

            {/* Wrap footer so we can observe it */}
            <div >
                <Footer className={`h-[200px]`} />
            </div>
        </div>
    );
};

export default Layout;
