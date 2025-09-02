import React from "react";
import "./RotatingText.css";

export default function RotatingText() {
    const words = ["HIV Test","STI Test","PrEP Consultation", "Consultation"  ];

    return (
        <h1
            className="text-4xl font-semibold flex flex-wrap gap-2 w-full overflow-hidden whitespace-nowrap"
            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
        >
            <span className="block">Book a free</span>
            <span className="relative h-7 min-w-[150px]">
                <span className="absolute flex flex-col rotating-words">
                    {words.map((word, i) => (
                        <span key={i} className="text-[#1475A1] text-[26px] md:text-4xl">
                            {word}
                        </span>
                    ))}
                </span>
            </span>
        </h1>
    );
}
