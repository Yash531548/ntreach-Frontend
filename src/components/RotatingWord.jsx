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
