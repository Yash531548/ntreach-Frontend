import React, { useState } from "react";

const ProviderMySlots = () => {
    const [slots, setSlots] = useState([]);
    const addSlot = () => {
        setSlots((prev) => ([
            ...prev,
            { date: '', time: '', meetingLink: "" }
        ]))
    }
    const handleChange = (index, field, value) => {
        const updatedSlots = [...slots];
        updatedSlots[index][field] = value;
        setSlots(updatedSlots);
    }
    const updateSlots = () => {
        console.log("Updated Slots:", slots);
        // Call API here
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-xl font-semibold mb-4">My Slots</h1>
            <button className="w-full max-w-sm bg-black text-white px-4 py-3 cursor-pointer" onClick={addSlot}>Add Slot</button>
            {/* Render slot forms below button */}
            {slots.map((slots, index) => (
                <div key={index} className="border border-gray-200 p-4 mb-3 rounde-md bg-gray-50">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Select Date</label>
                        <input type="date" value={slots.date} onChange={(e)=> handleChange(index,"date",e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
                        <label className="text-sm font-medium text-black">Select Slot</label>
                        <input type="time" value={slots.time} onChange={(e)=> handleChange(index,"time",e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
                        <label className="text-sm font-medium text-black">Meeting Link</label>
                        <input type="url" placeholder="Paste here" value={slots.meetingLink} onChange={(e)=> handleChange(index,"meetingLink",e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
                    </div>
                </div>
            ))}
            {slots.length> 0 && (
                <button onclick={updateSlots} className="w-full max-w-sm rounde-md px-4 py-3 bg-black text-white cursor-pointer">Update Slots</button>
            )}
        </div>
    );
};

export default ProviderMySlots;
