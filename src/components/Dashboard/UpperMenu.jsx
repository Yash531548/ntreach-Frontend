import React from 'react'

const UpperMenu = ({setSelectedView}) => {
    return (
        <div className="flex flex-row space-x-4 w-max">
            <div className="border-2 min-w-[140px] px-4 py-2 text-center rounded-lg whitespace-nowrap"  onClick={() => setSelectedView("Home")}>Home</div>
            <div className="border-2 min-w-[180px] px-4 py-2 text-center rounded-lg whitespace-nowrap" onClick={() => setSelectedView("Upcoming Appointments")}>Upcoming Appointments</div>
            <div className="border-2 min-w-[170px] px-4 py-2 text-center rounded-lg whitespace-nowrap" onClick={() => setSelectedView("My Results/Past Data")}>My Result/Past data</div>
            <div className="border-2 min-w-[140px] px-4 py-2 text-center rounded-lg whitespace-nowrap" onClick={() => setSelectedView("userProfile")}>View Your Profile</div>
        </div>
    )
}

export default UpperMenu