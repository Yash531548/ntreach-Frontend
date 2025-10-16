import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import api from "../../Api/api";

const Model = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition" onClick={onClose}>
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6" role="dialog" aria-modal='true'>
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

function convertTo12Hour(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12; // convert '0' to '12', and '13-23' to '1-11'

  return `${hour}:${minute} ${ampm}`;
}

function capitalizeFirstLetter(str) {
  if (!str) return ""; // handle empty or null string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ProviderUpcomingAppointments = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = useCallback(async () => {
    try {
      const response = await api.get('sp/upcoming_booking');
      setAppointments(response.data.upcoming);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const cancelAppointment = useCallback(async (id) => {
    try {
      await api.post('/sp/cancle_booking', {
        booking_id: id,
        reason: 'Not available',
      });

      getAppointments();
    } catch (error) {
      console.error(error);
    }
  }, [getAppointments]);

  // Derived filtered/sorted data
  const filteredAppointments = useMemo(() => {
    let filtered = appointments.filter((appt) =>
      appt.service.toLowerCase().includes(search.toLowerCase())
    );

    if (filterBy !== "all") {
      filtered = filtered.filter(
        (appt) =>
          (filterBy === "audio" && appt.type.includes("audio")) ||
          (filterBy === "video" && appt.type.includes("video"))
      );
    }

    // if (sortBy === "date") {
    //   filtered = filtered.sort(
    //     (a, b) =>
    //       new Date(a.date.split("-").reverse().join("-")) -
    //       new Date(b.date.split("-").reverse().join("-"))
    //   );
    // }

    return filtered;
  }, [search, sortBy, filterBy, appointments]);

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  return (
    <div className="bg-white p-3 md:p-6 rounded-lg md:shadow-sm  box-border w-full h-full">
      <h1 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Upcoming Appointments</h1>

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
                key={appt.booking_id}
                className="border-b border-gray-200 hover:bg-gray-50 text-xs"
              >
                <td className="py-2 px-3">{String(index + 1).padStart(2, "0")}</td>
                <td className="py-2 px-3">{appt.date}</td>
                <td className="py-2 px-3">{appt.patient_name}</td>
                <td className="py-2 px-3 ">{appt.type === 'audio' ? 'Audio Teleconsultation' : 'Video Teleconsultation'}</td>
                <td className="py-2 px-3">{convertTo12Hour(appt.start_time)} - {convertTo12Hour(appt.end_time)}</td>
                <td className="py-2 px-3 text-black flex flex-col md:flex-row gap-1 md:gap-2">
                  <button className="hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedAppt(appt);
                      setModalOpen(true);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="text-red-500 hover:underline cursor-pointer"
                    onClick={() => cancelAppointment(appt.booking_id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Meeting Info Popup */}
      <Model open={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedAppt && (
          <div>
            <div className="mb-3">
              <h3 className="text-lg font-semibold mb-2">Meeting Information</h3>
              <hr />
            </div>
            <div className="mb-5">
              <div className="text-[13px] mb-1 text-gray-600 font-medium">Patient Name</div>
              <div className="text-sm capitalize">{selectedAppt.patient_name || "—"}</div>
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
                <div className="text-sm">{convertTo12Hour(selectedAppt.start_time)} - {convertTo12Hour(selectedAppt.end_time)}</div>
              </div>
            </div>
            <div className="mb-5 grid grid-cols-2 ">
              <div>
                <div className="text-[13px] mb-1 text-gray-600 font-medium">Type of Consultation</div>
                <div className="text-sm">{selectedAppt.type === 'audio' ? 'Audio Teleconsultation' : 'Video Teleconsultation'}</div>
              </div>
              <div>
                <div className="text-[13px] mb-1 text-gray-600 font-medium">Type of Service</div>
                <div className="text-sm">{capitalizeFirstLetter(selectedAppt.service.replaceAll('_', ' '))}</div>
              </div>
            </div>
            <div className="mb-5">
              <div className="text-[13px] mb-1 text-gray-600 font-medium">Meeting Link</div>
              <div className="text-sm break-all">{selectedAppt.meeting_link || "—"}</div>
            </div>
            <div className="flex gap-3 mt-4 ">
              <a
                href={selectedAppt.meeting_link}
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
                onClick={() => {
                  setModalOpen(false)
                  cancelAppointment(selectedAppt.booking_id);
                }}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        )}
      </Model>
    </div>
  )
}

export default ProviderUpcomingAppointments
