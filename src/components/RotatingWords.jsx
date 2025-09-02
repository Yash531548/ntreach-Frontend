// // import React from "react";
// // import "./RotatingText.css";

// // export default function RotatingText() {
// //     const words = ["Consultation", "PrEP Consultation", "STI Test", "HIV Test"];

// //     return (
// //         <h1 className="text-4xl font-semibold flex gap-2 overflow-hidden  w-full whitespace-nowrap" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
// //             Book a free 
// //             <span className="relative h-8 ">
// //                 <span className="absolute flex flex-col rotating-words    ">
// //                     {words.map((word, i) => (
// //                         <span key={i} className="text-[#1475A1] ">
// //                             {word}
// //                         </span>
// //                     ))}
// //                 </span>
// //             </span>
// //         </h1>
// //     );
// // }
// import React from "react";
// import "./RotatingText.css";

// export default function RotatingText() {
//     const words = ["Consultation", "PrEP Consultation", "STI Test", "HIV Test"];

//     return (
//         <h1
//             className="text-4xl font-semibold flex flex-wrap gap-2 w-full overflow-hidden whitespace-nowrap"
//             style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
//         >
//             <span className="block">Book a free</span>
//             <span className="relative h-7 min-w-[150px]">
//                 <span className="absolute flex flex-col rotating-words">
//                     {words.map((word, i) => (
//                         <span key={i} className="text-[#1475A1] text-[26px] md:text-4xl">
//                             {word}
//                         </span>
//                     ))}
//                 </span>
//             </span>
//         </h1>
//     );
// }


import React, { useEffect, useRef, useState } from "react";

// Your list of rotating words
const words = ["HIV Test", "STI Test", "PrEP Consultation", "Consultation"];

function RotatingText() {
    const [index, setIndex] = useState(0);
    const [isAnimated, setIsAnimated] = useState(true);
    const timeoutRef = useRef();

    useEffect(() => {
        // Standard delay and duration for animated transitions
        if (index < words.length - 1) {
            
            setIsAnimated(true); // ensure animation for regular transitions
            timeoutRef.current = setTimeout(() => {
                setIndex(idx => idx + 1);
            }, 1300); // 1s visible + 0.3s animation, tweak as needed
            console.log('Animated step:', index);
        } else {
            
            // Last word: after it shows, instantly return to first word with no animation
            setIsAnimated(true); // animate in to last word
            timeoutRef.current = setTimeout(() => {
                setIsAnimated(false); // disable animation for reset snap
                setIndex(0); // snap to first word
                // Re-enable animation immediately (allow one render frame)
                console.log('RESET to first word, no animation');
                setTimeout(() => setIsAnimated(true), 30);
            }, 1300);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [index]);

    return (
        <div className="flex gap-2 items-center flex-col md:flex-row" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
            <span className="block -ml-6 md:ml-0 text-4xl  ">Book a free</span>
            <span className="relative h-7 min-w-[190px] overflow-hidden">
                <div
                    className={`${isAnimated ? "transition-transform duration-300 ease-linear" : ""} flex flex-col`}
                    style={{
                        transform: `translateY(-${index * 1.75}rem)`, // 1.75rem = h-7, adjust to match your item height
                        willChange: "transform"
                    }}
                >
                    {words.map((word, i) => (
                        <span
                            key={i}
                            className="text-[#1475A1] text-[26px] md:text-4xl h-7 flex items-center"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </span>
        </div>
    );
}

export default RotatingText;
