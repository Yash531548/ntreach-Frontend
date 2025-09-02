// import React, { useEffect, useRef, useState } from "react";

// const words = ["HIV Test", "STI Test", "PrEP Consultation", "Consultation"];

// function RotatingWord() {
//     // We'll add a duplicate of the first word at the end for smooth looping
//     const extendedWords = [...words, words[0]];
//     const [index, setIndex] = useState(0);
//     const [isAnimated, setIsAnimated] = useState(true);
//     const timeoutRef = useRef(null);
//     console.log(`Rendering RotatingWord component at index ${index} with animation ${isAnimated}`);

//     useEffect(() => {
//         console.log(`Current index: ${index}, Animation enabled: ${isAnimated}`);

//         timeoutRef.current = setTimeout(() => {
//             setIndex((prev) => prev + 1);
//         }, 1300);

//         if (index === words.length) {
//             console.log("Reached duplicate last word, preparing to reset index to 0 with no animation");

//             setIsAnimated(false);
//             setTimeout(() => {
//                 console.log("Resetting index to 0 and re-enabling animation");
//                 setIsAnimated(true);
//                 setIndex(0);
//             }, 300); // matches CSS animation duration
//         }

//         return () => clearTimeout(timeoutRef.current);
//     }, [index]);


//     return (
//         <div
//             className="flex gap-2 items-center flex-col md:flex-row"
//             style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
//         >
//             <span className="block -ml-6 md:ml-0 text-4xl">Book a free</span>
//             <span className="relative h-7 min-w-[190px] overflow-hidden">
//                 <div
//                     className={`${isAnimated ? "transition-transform duration-300 ease-linear" : ""} flex flex-col`}

//                     style={{
//                         transform: `translateY(-${index * 1.75}rem)`,
//                         willChange: "transform",
//                     }}
//                 >
//                     {extendedWords.map((word, i) => (
//                         <span
//                             key={i}
//                             className="text-[#1475A1] text-[26px] md:text-4xl h-7 flex items-center"
//                             style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
//                         >
//                             {word}
//                         </span>
//                     ))}
//                 </div>
//             </span>
//         </div>
//     );
// }

// export default RotatingWord;


// import React, { useEffect, useRef, useState } from "react";

// const words = ["HIV Test", "STI Test", "PrEP Consultation", "Consultation"];

// function RotatingWord() {
//     const extendedWords = [...words, words[0]];
//     const [index, setIndex] = useState(0);
//     const [isAnimated, setIsAnimated] = useState(true);
//     const timeoutRef = useRef(null);
//     const containerRef = useRef(null);

//     // useEffect(() => {
//     //     timeoutRef.current = setTimeout(() => {
//     //         setIndex((prev) => prev + 1);
//     //     }, 1300);

//     //     // if (index === words.length) {
//     //     if (index === extendedWords.length ) {
//     //         // Last duplicate word reached, prepare reset
//     //         setIsAnimated(false);
//     //         setIndex(0); // Instant reset index

//     //         setTimeout(() => {
//     //             // Force reflow:
//     //             if (containerRef.current) containerRef.current.offsetWidth;

//     //             setIsAnimated(true);
//     //         }, 50); // small delay for reflow and reset
//     //     }

//     //     return () => clearTimeout(timeoutRef.current);
//     // }, [index]);
//     useEffect(() => {
//         if (index < extendedWords.length - 1) {
//             // Normal increment
//             timeoutRef.current = setTimeout(() => {
//                 setIndex((prev) => prev + 1);
//             }, 1200);
//         } else {
//             // Last duplicate word reached, prepare reset
//             timeoutRef.current = setTimeout(() => {
//                 setIsAnimated(false);
//                 setIndex(0); // Instant reset index

//                 setTimeout(() => {
//                     if (containerRef.current) containerRef.current.offsetWidth; // force reflow
//                     setIsAnimated(true);
//                 }, 0);
//             }, 800); // Keep same duration for consistent timing
//         }

//         return () => clearTimeout(timeoutRef.current);
//     }, [index]);

//     return (
//         <div
//             className="flex gap-2 items-center flex-col md:flex-row"
//             style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
//         >
//             <span className="block -ml-6 md:ml-0 text-4xl">Book a free</span>
//             <span className="relative h-7 min-w-[190px] overflow-hidden">
//                 <div
//                     ref={containerRef}
//                     className={`${isAnimated ? "transition-transform duration-300 ease-linear" : ""
//                         } flex flex-col`}
//                     style={{
//                         transform: `translateY(-${index * 1.75}rem)`,
//                         willChange: "transform",
//                     }}
//                 >
//                     {extendedWords.map((word, i) => (
//                         <span
//                             key={i}
//                             className="text-[#1475A1] text-[26px] md:text-3xl xl:text-4xl h-7 flex items-center"
//                             style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
//                         >
//                             {word}
//                         </span>
//                     ))}
//                 </div>
//             </span>
//         </div>
//     );
// }

// export default RotatingWord;



import React, { useEffect, useRef, useState } from "react";

const words = ["HIV Test", "STI Test", "PrEP Consultation", "Consultation"];

function RotatingWord() {
    const extendedWords = [...words, words[0]];
    const [index, setIndex] = useState(0);
    const [isAnimated, setIsAnimated] = useState(true);
    const timeoutRef = useRef(null);
    const containerRef = useRef(null);
    const itemRef = useRef(null);  // Ref for single sliding item to measure height
    const [itemHeight, setItemHeight] = useState(0);

    useEffect(() => {
        if (itemRef.current) {
            setItemHeight(itemRef.current.clientHeight);
        }
    }, []);

    useEffect(() => {
        if (!itemHeight) return; // wait until height is measured

        if (index < extendedWords.length - 1) {
            timeoutRef.current = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, 1200);
        } else {
            timeoutRef.current = setTimeout(() => {
                setIsAnimated(false);
                setIndex(0);

                setTimeout(() => {
                    if (containerRef.current) containerRef.current.offsetWidth; // force reflow
                    setIsAnimated(true);
                }, 50);
            }, 1200);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [index, itemHeight]);

    return (
        <div
            className="flex gap-2 items-center flex-col md:flex-row"
            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
        >
            <span className="block -ml-6 md:ml-0 text-4xl">Book a free</span>
            <span className="relative overflow-hidden min-w-[190px]" style={{ height: itemHeight || "auto" }}>
                <div
                    ref={containerRef}
                    className={`${isAnimated ? "transition-transform duration-300 ease-linear" : ""} flex flex-col`}
                    style={{
                        transform: `translateY(-${index * itemHeight}px)`,
                        willChange: "transform",
                    }}
                >
                    {extendedWords.map((word, i) => (
                        <span
                            ref={i === 0 ? itemRef : null} // only first item to measure height
                            key={i}
                            className="text-[#1475A1] text-[26px] md:text-3xl xl:text-4xl flex items-center"
                            style={{
                                fontFamily: "Sofia Pro",
                                fontWeight: 400,
                                height: "auto",
                                lineHeight: 1,
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </span>
        </div>
    );
}

export default RotatingWord;
