import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

const Model = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition" onClick={onClose}>
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6" role="dialog" aria-modal='true' onClick={e => e.stopPropagation()}>
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X size={22} />
                </button>
                {children}
            </div>
        </div>
    )
}
const ProviderPastAppointments = () => {
    // Mock API response data
    const appointmentsData = [
        {
            // id: 1,
            // date: "02-10-2025",
            // name: "Yukti Aggarwal",
            // type: "Audio Teleconsultation",
            // time: "9:00 AM–10:00 AM",
            id: 1,
            date: "02-10-2025",
            name: "Yukti Aggarwal",
            gender: "Transgender",
            bloodGroup: "O+",
            type: "Audio Consultation",
            service: "PrEP Consultation",
            notes:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            meetingLink: "https://meet.example.com/abcdefg",
            time: "9:00 AM–10:00 AM",
        },
        {
            id: 2,
            date: "02-10-2025",
            name: "Priya Yadav",
            type: "Audio Teleconsultation",
            time: "11:00 AM–12:00 PM",
        },
        {
            id: 3,
            date: "05-10-2025",
            name: "Yukti Aggarwal",
            type: "Audio Teleconsultation",
            time: "9:00 AM–10:00 AM",
        },
        {
            id: 4,
            date: "10-10-2025",
            name: "Puja Kapoor",
            type: "Video Teleconsultation",
            time: "9:00 AM–10:00 AM",
        },
        {
            id: 5,
            date: "10-10-2025",
            name: "Rahul Mehra",
            type: "Video Teleconsultation",
            time: "2:00 PM–3:00 PM",
        },
        {
            id: 6,
            date: "10-10-2025",
            name: "Yukti Aggarwal",
            type: "Audio Teleconsultation",
            time: "4:00 PM–5:00 PM",
        },
    ];

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [filterBy, setFilterBy] = useState("all");
    const [selectedAppt, setSelectedAppt] = useState(null);
    // Popup/modal state    
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(""); // "view_detail" | "get_summary" | "view_summary"

    // Extra modal fields (summary/transcript inputs for get_summary mode)
    const [transcriptInput, setTranscriptInput] = useState("");
    const [summaryInput, setSummaryInput] = useState("");

    // Show modal for a given appointment and mode
    const openModal = (mode, appt) => {
        setSelectedAppt(appt);
        setModalMode(mode);
        setModalOpen(true);
        setTranscriptInput(appt?.transcript || "");
        setSummaryInput(appt?.summary || "");
    };
    const closeModal = () => {
        setModalOpen(false);
        setModalMode("");
        setSelectedAppt(null);
        setTranscriptInput("");
        setSummaryInput("");
    };
    const handleSummarySubmit = () => {
        // Use selectedAppt.id, transcriptInput, and summaryInput with API here
        closeModal();
    };
    // Derived filtered/sorted data
    const filteredAppointments = useMemo(() => {
        let filtered = appointmentsData.filter((appt) =>
            appt.name.toLowerCase().includes(search.toLowerCase())
        );

        if (filterBy !== "all") {
            filtered = filtered.filter(
                (appt) =>
                    (filterBy === "audio" && appt.type.includes("Audio")) ||
                    (filterBy === "video" && appt.type.includes("Video"))
            );
        }

        if (sortBy === "date") {
            filtered = filtered.sort(
                (a, b) =>
                    new Date(a.date.split("-").reverse().join("-")) -
                    new Date(b.date.split("-").reverse().join("-"))
            );
        }

        return filtered;
    }, [appointmentsData, search, sortBy, filterBy]);
    return (
        <div className="bg-white p-3 md:p-6 rounded-lg md:shadow-sm  box-border w-full h-full">
            <h1 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Past Appointments</h1>

            {/* Top Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                    >
                        <option value="date">Sort by: Date</option>
                        <option value="name">Sort by: Name</option>
                    </select>
                    <select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                    >
                        <option value="all">View by Type: All</option>
                        <option value="audio">Audio Teleconsultation</option>
                        <option value="video">Video Teleconsultation</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="w-full max-h-[69vh] max-w-[95vw]  overflow-y-auto overflow-x-auto rounded-md shadow-sm mt-[2rem] mb-[1rem] pt-3 "
                style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}>
                <table className=" text-left border-collapse whitespace-nowrap w-full ">
                    <thead>
                        <tr className="border-b border-gray-300 text-gray-600 text-left text-xs">
                            <th className="py-2 px-3 ">SL.No</th>
                            <th className="py-2 px-3 ">Date</th>
                            <th className="py-2 px-3 ">Name</th>
                            <th className="py-2 px-3 ">Type of Consultation </th>
                            <th className="py-2 px-3 ">Time Slot</th>
                            <th className="py-2 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appt, index) => (
                            <tr
                                key={appt.id}
                                className="border-b border-gray-200 hover:bg-gray-50 text-xs"
                            >
                                <td className="py-2 px-3">{String(index + 1).padStart(2, "0")}</td>
                                <td className="py-2 px-3">{appt.date}</td>
                                <td className="py-2 px-3">{appt.name}</td>
                                <td className="py-2 px-3 ">{appt.type}</td>
                                <td className="py-2 px-3">{appt.time}</td>
                                <td className="py-2 px-3 text-black flex flex-col md:flex-row gap-1 md:gap-2">
                                    <button className="hover:underline cursor-pointer"
                                        onClick={() => openModal(appt.summary ? "view_summary" : "get_summary", appt)}>
                                        {appt.summary ? "View Summary" : "Get Summary"}
                                    </button>
                                    <button className="hover:underline cursor-pointer" onClick={() => {
                                        // setSelectedAppt(appt);
                                        // setModalOpen(true);
                                        openModal("view_detail", appt)
                                    }}>View Details</button>
                                    <button className="text-red-500 hover:underline cursor-pointer">Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Meeting Info Popup */}
            <Model open={modalOpen} onClose={() => setModalOpen(false)}>
                {modalMode === "view_detail" && selectedAppt && (
                    <div>
                        <div className="mb-3">
                            <h3 className="text-lg font-semibold mb-2">Meeting Information</h3>
                            <hr />
                        </div>
                        <div className="mb-5">
                            <div className="text-[13px] mb-1 text-gray-600 font-medium">Patient Name</div>
                            <div className="text-sm">{selectedAppt.name}</div>
                        </div>
                        {/* <div className="mb-2 flex flex-col md:flex-row gap-4 md:gap-12"> */}
                        {/* <div className="mb-5 grid grid-cols-2 ">
                            <div>
                                <div className="text-[13px] mb-1 text-gray-600 font-medium">Patient Gender</div>
                                <div className="text-sm">{selectedAppt.gender || "—"}</div>
                            </div>
                            <div>
                                <div className="text-[13px] mb-1 text-gray-600 font-medium">Patient Blood Group</div>
                                <div className="text-sm">{selectedAppt.bloodGroup || "—"}</div>
                            </div>
                        </div> */}
                        <div className="mb-5 grid grid-cols-2 ">
                            <div>
                                <div className="text-[13px] mb-1 text-gray-600 font-medium"> Date</div>
                                <div className="text-sm">{selectedAppt.date || "—"}</div>
                            </div>
                            <div>
                                <div className="text-[13px] mb-1 text-gray-600 font-medium"> Time</div>
                                <div className="text-sm">{selectedAppt.time || "—"}</div>
                            </div>
                        </div>
                        <div className="mb-5 grid grid-cols-2 ">
                            <div>
                                <div className="text-[13px] mb-1 text-gray-600 font-medium">Type of Consultation</div>
                                <div className="text-sm">{selectedAppt.type}</div>
                            </div>
                            <div>
                                <div className="text-[13px] mb-1 text-gray-600 font-medium">Type of Service</div>
                                <div className="text-sm">{selectedAppt.service || "—"}</div>
                            </div>
                        </div>
                        {/* <div className="mb-6">
                            <div className="text-[13px] mb-1 text-gray-600 font-medium">Notes from Patient</div>
                            <div className="text-sm mb-2">{selectedAppt.notes || "—"}</div>
                        </div> */}
                        <div className="mb-5">
                            <div className="text-[13px] mb-1 text-gray-600 font-medium">Meeting Link</div>
                            <div className="text-sm break-all">{selectedAppt.meetingLink || "—"}</div>
                        </div>
                        <div className="flex gap-3 mt-4 ">
                            <a
                                href={selectedAppt.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition text-sm flex-1 flex items-center justify-center  cursor-pointer"
                            >
                                Join Link
                            </a>
                            <button
                                type="button"
                                className="px-8 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-sm flex-1 text-center cursor-pointer"
                                // Add real cancellation logic here
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel Appointment
                            </button>
                        </div>
                    </div>
                )}
                {modalMode === "get_summary" && selectedAppt && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Get Summary</h3>
                        <hr />
                        <div className="my-5">
                            <div className="text-[13px] mb-1 text-gray-600 font-medium">Paste Transcript Below</div>
                            <textarea
                                rows={8}
                                className="w-full border border-gray-300 rounded-md p-2 mb-3"
                                value={transcriptInput}
                                onChange={e => setTranscriptInput(e.target.value)}
                                placeholder="Paste transcript here"
                            />
                            
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
                                onClick={handleSummarySubmit}
                            >
                                Input / Get Summary
                            </button>
                        </div>
                    </div>
                )}
                {modalMode === "view_summary" && selectedAppt && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Appointment Summary</h3>
                        <hr />
                        <div className="mb-5">
                            <div className="text-[13px] mb-1 text-gray-600 font-medium">Transcript</div>
                            <div className="text-sm mb-2 whitespace-pre-wrap">{selectedAppt.transcript || "—"}</div>
                            <div className="text-[13px] mb-1 text-gray-600 font-medium">Summary</div>
                            <div className="text-sm mb-2 whitespace-pre-wrap">{selectedAppt.summary || "—"}</div>
                        </div>
                    </div>
                )}
            </Model>
        </div>
    )
}

export default ProviderPastAppointments