import React, { useState } from "react";


const getSlotOptions = () => {
    //  10:00 to 17:40, every 20 mins
    const slots = []

    for (let h = 10; h <= 17; h++) {
        for (let m = 0; m < 60; m += 20) {
            const hour = h.toString().padStart(2, '0');
            const minute = m.toString().padStart(2, "0");
            slots.push(`${hour}:${minute}`);
        }
    }
    return slots;
}
// Helper to add minutes string-wise
const addMinutes = (startTime, mins) => {
    let [hour, minute] = startTime.split(':').map(Number);
    minute += mins;
    hour += Math.floor(minute / 60);
    minute = minute % 60;
    if (hour > 18) return ''
    let endtime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return endtime;
}
const ProviderMySlots = () => {
    const [slots, setSlots] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    // const slotsInterval = getSlotOptions();
    // console.log(slotsInterval)
    const addSlot = () => {
        setSlots((prev) => ([
            ...prev,
            { date: '', startTime: '', endTime: '', meetingLink: "" }
        ]))
    }
    const handleChange = (index, field, value) => {
        let message = "";
        // Only allow values between 10:00 and 18:00
        if (field === "startTime" || field === "endTime") {
            if (value < "10:00" || value > "18:00") {
                message = "Time must be between 10:00 and 18:00";
                // Optionally, reset the field
                value = "";
            }
        }
        const updatedSlots = [...slots];
        updatedSlots[index][field] = value;
        setSlots(updatedSlots);

        // Set or clear the error for this slot
        setErrorMessages(prev => ({ ...prev, [index]: message }));
    }

    const updateSlots = () => {
        // Validate all slots
        const errors = [];
        slots.forEach((slot, idx) => {
            if (!slot.date || !slot.startTime || !slot.endTime) {
                errors.push(`Slot #${idx + 1} is incomplete.`);
                return;
            }
            if (slot.startTime < "10:00" || slot.endTime > "18:00") {
                errors.push(`Slot #${idx + 1}: Times must be between 10:00 and 18:00.`);
            }
            if (slot.startTime >= slot.endTime) {
                errors.push(`Slot #${idx + 1}: Start Time must be before End Time.`);
            }
        });

        if (errors.length) {
            alert(errors.join('\n'));
            return;
        }
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
                        <input type="date" value={slots.date} onChange={(e) => handleChange(index, "date", e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
                        {/* <input type="time" value={slots.time} onChange={(e)=> handleChange(index,"time",e.target.value)} className="border border-gray-300 px-2 py-1 rounded" /> */}
                        {/* <select name="time" id="time" value={slots.time} onChange={(e) => handleChange(index, "time", e.target.value)} className="border border-gray-300 px-2 py-1 rounded relative "><option value="">Select Slot</option>
                            {slotsInterval.map((t, idx) => (
                                <option value={t} key={idx}>{t} - {addMinutes(t, 20)}</option>
                            ))}
                        </select> */}
                        {/* <div className="relative">
                            <div onClick={()=>setDropdownOpen(!dropdownOpen)} className="border border-gray-300 px-2 py-1 rounded flex justify-between">
                            {slots.time || "Select Slot"}
                            <span className={`inline-block transform transition-transform duration-300 ${dropdownOpen ? "rotate-180": "rotate-0"}`}>▼</span>
                            </div>
                            {dropdownOpen && (
                                <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-48 overflow-y-auto rounded mt-1">
                                {slotsInterval.map((t,idx)=>(
                                    <div onClick={()=>{
                                            handleChange(index,"time",t)
                                            // toggleDropdown(index)
                                            setDropdownOpen(false);// Close dropdown on selection
                                        }} className="px-2 py-1 hover:bg-gray-200 cursor-pointer">{t} - {addMinutes(t,20)}</div>
                                    ))}
                                </div>
                            )}
                            </div> */}
                        <div className="flex flex-col md:flex-row gap-2 md:gap-5 ">
                            <div className="flex flex-col flex-1 gap-2">

                                <label className="text-sm font-medium text-black">Select Slot</label>

                                <input
                                    type="time"
                                    min="10:00"
                                    max="18:00"
                                    value={slots.startTime}
                                    step="60"
                                    onChange={(e) => handleChange(index, "startTime", e.target.value)}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                />
                                {errorMessages[index] && <span className="text-red-500 text-xs">{errorMessages[index]}</span>}
                            </div>
                            <div className="flex flex-col flex-1 gap-2">

                                <label className="text-sm font-medium text-black">End Time</label>
                                <input
                                    type="time"
                                    min="10:00"
                                    max="18:00"
                                    value={slots.endTime}
                                    step="60"
                                    onChange={(e) => handleChange(index, "endTime", e.target.value)}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                />
                                {errorMessages[index] && <span className="text-red-500 text-xs">{errorMessages[index]}</span>}
                            </div>

                        </div>

                        <label className="text-sm font-medium text-black">Meeting Link</label>
                        <input type="url" placeholder="Paste here" value={slots.meetingLink} onChange={(e) => handleChange(index, "meetingLink", e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
                    </div>
                </div>
            ))}
            {slots.length > 0 && (
                <button onClick={updateSlots} className="w-full max-w-sm rounde-md px-4 py-3 bg-black text-white cursor-pointer">Update Slots</button>
            )}
        </div>
    );
};

export default ProviderMySlots;

