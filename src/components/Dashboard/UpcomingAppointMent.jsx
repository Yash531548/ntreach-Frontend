import React from 'react'

const UpcomingAppointMent = ({setSubView}) => {
    // Mock data (replace later with API response)
    
    const appointments = [
        { id: 1, date: "24/01/25", testType: "HIV Test", type: "Upcoming", centre: "Location" },
        { id: 2, date: "24/01/25", testType: "HIV Test", type: "Follow-up", centre: "Location" },
        { id: 3, date: "28/01/25", testType: "Blood Test", type: "Upcoming", centre: "Health Centre A" },
        { id: 4, date: "30/01/25", testType: "X-Ray", type: "Upcoming", centre: "City Hospital" },
        { id: 5, date: "02/02/25", testType: "COVID-19 Test", type: "Follow-up", centre: "Clinic B" },
        { id: 6, date: "05/02/25", testType: "HIV Test", type: "Upcoming", centre: "Health Centre A" },
        { id: 7, date: "07/02/25", testType: "MRI Scan", type: "Upcoming", centre: "Diagnostic Lab" },
        { id: 8, date: "10/02/25", testType: "Blood Test", type: "Follow-up", centre: "Clinic C" },
        { id: 9, date: "12/02/25", testType: "HIV Test", type: "Upcoming", centre: "Location" },
        { id: 10, date: "15/02/25", testType: "Ultrasound", type: "Upcoming", centre: "City Hospital" },
    ];
    return (
        <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-8 px-10'>
            <div className='flex  items-center justify-between gap-4'>

                <p className='text-[#0063B9] text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Upcoming Appointments</p>

            </div>
            <div className="w-full max-h-[53vh] overflow-y-auto overflow-x-auto rounded-4xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                <table className="w-full text-left border-collapse">
                    {/* Table Header */}
                    <thead>
                        <tr className="text-[#626262] text-xs" >
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Test Date</th>
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Type of Test</th>
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Type</th>
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Centre</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {appointments.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`text-xs text-left hover:bg-[#E9F8FF] hover:border-0 border-b border-b-[#DEDEDE]  `}
                            >
                                <td className="py-3 px-4 rounded-l-full">{item.date}</td>
                                <td className="py-3 px-4">{item.testType}</td>
                                <td className="py-3 px-4">{item.type}</td>
                                <td className="py-3 px-4">{item.centre}</td>
                                <td className="py-3 px-4 text-[#0078D4] cursor-pointer rounded-r-full">
                                    <button 
                                    onClick={()=>{setSubView('Reschedule')}}
                                    className="text-[#323FF7] hover:underline cursor-pointer">
                                        Reschedule
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UpcomingAppointMent