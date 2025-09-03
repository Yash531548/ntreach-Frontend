import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import UploadReportModal from './UploadReportModal';
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
const ResultData = ({ setSubView, setSelectedView }) => {
    const [openModal, setOpenModal] = useState(false);
    const mockReports = [
        {
            date: "24/01/25",
            type: "HIV Test",
            status: "-",
            report: "Upload Report",
            reportType: "upload", // upload | reupload | view
        },
        {
            date: "24/01/25",
            type: "HIV Test",
            status: "-",
            report: "Upload Report",
            reportType: "upload",
        },
        {
            date: "24/01/25",
            type: "STI Test",
            status: "-",
            report: "Re-upload Report",
            reportType: "reupload",
        },
        {
            date: "24/01/25",
            type: "STI Test",
            status: "Negative",
            report: "View Report",
            reportType: "view",
        },
        {
            date: "25/01/25",
            type: "Blood Test",
            status: "-",
            report: "Upload Report",
            reportType: "upload",
        },
        {
            date: "25/01/25",
            type: "Covid Test",
            status: "Pending",
            report: "Re-upload Report",
            reportType: "reupload",
        },
        {
            date: "26/01/25",
            type: "X-Ray",
            status: "Completed",
            report: "View Report",
            reportType: "view",
        },
        {
            date: "26/01/25",
            type: "MRI Scan",
            status: "-",
            report: "Upload Report",
            reportType: "upload",
        },
        {
            date: "27/01/25",
            type: "Urine Test",
            status: "Positive",
            report: "View Report",
            reportType: "view",
        },
    ];

    return (
        <div className='rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 md:shadow-sm pt-5 md:px-4 xl:pt-8 xl:px-10'>
            <div className='flex  items-center justify-between gap-4'>
                <p className='text-[#0063B9]  text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>My Results/Past Data</p>
                <div className='relative' onClick={() => setSelectedView("Notifications")}>
                    <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                    <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>
            <div className="w-full max-h-[45vh] overflow-y-auto overflow-x-auto rounded-2xl md:rounded-3xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                <table className="min-w-full border-collapse  ">
                    <thead>
                        <tr className="whitespace-nowrap text-left text-[#626262] text-xs" >
                            <th className="px-4 py-3 " style={{ fontFamily: "Sofia Pro", fontWeight: 400 }} >Test Date</th>
                            <th className=" md:px-4 py-3" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Type of Test</th>
                            <th className="px-4 py-3 text-center" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Status</th>
                            <th className="px-4 py-3" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Report/Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockReports.map((report, index) => (
                            <tr
                                key={index}
                                // className={`text-xs text-center  ${index === 0 ? "bg-blue-50 " : ""}`}
                                className={`text-xs text-left hover:bg-[#E9F8FF] hover:border-0 border-b border-b-[#DEDEDE] whitespace-nowrap `}
                            >
                                <td className="px-4 py-3 rounded-l-4xl">{report.date}</td>
                                <td className="px-4 py-3">{report.type}</td>
                                <td className="px-4 py-3 text-center">{report.status}</td>
                                <td className="px-4 py-3 rounded-r-4xl text-[#323FF7]">
                                    {report.reportType === "upload" && (
                                        <span
                                            onClick={() => setOpenModal(true)}
                                            className=" cursor-pointer hover:underline ">
                                            {report.report}
                                        </span>
                                    )}
                                    {report.reportType === "reupload" && (
                                        <span className="text-red-500 cursor-pointer hover:underline flex items-center  gap-1 -ml-3 ">
                                            <span className="h-2 w-2 rounded-full bg-red-500  "></span>
                                            {report.report}
                                        </span>
                                    )}
                                    {report.reportType === "view" && (
                                        <span className=" cursor-pointer hover:underline">
                                            {report.report}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal */}
                <UploadReportModal open={openModal} onClose={() => setOpenModal(false)} />
            </div>

            {/* <div className='w-full  overflow-auto rounded-4xl shadow-sm h-[60%] mt-[2rem] mb-[1rem] pt-3 p-8 '>
                
                    <table className="min-w-full border-collapse  " >
                        <thead>
                            <tr className="text-left text-gray-600 text-sm">
                                <th className="px-4 py-3">Test Date</th>
                                <th className="px-4 py-3">Type of Test</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Report/Result</th>
                            </tr>
                        </thead>
                        <tbody className='border-2'>
                            {mockReports.map((report, index) => (
                                <tr
                                    key={index}
                                    className={`text-sm  ${index === 0 ? "bg-blue-50 rounded-full" : ""
                                        }`}
                                >
                                    <td className="px-4 py-3">{report.date}</td>
                                    <td className="px-4 py-3">{report.type}</td>
                                    <td className="px-4 py-3">{report.status}</td>
                                    <td className="px-4 py-3">
                                        {report.reportType === "upload" && (
                                            <span className="text-blue-600 cursor-pointer hover:underline">
                                                {report.report}
                                            </span>
                                        )}
                                        {report.reportType === "reupload" && (
                                            <span className="text-red-500 cursor-pointer hover:underline flex items-center gap-1">
                                                <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>
                                                {report.report}
                                            </span>
                                        )}
                                        {report.reportType === "view" && (
                                            <span className="text-blue-600 cursor-pointer hover:underline">
                                                {report.report}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            

            </div> */}
            <div className='  mt-[1rem] w-full rounded-2xl shadow-sm h-[19%] pt-3 p-7'>
                <p className='text-[#0063B9] text-lg mb-4' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Recommendations</p>
                <button
                    onClick={() => {
                        setSelectedView("teleconsultation");   // switch sidebar main tab
                        setSubView("Past Consultation"); // then open the correct subview
                    }}
                    style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                    className=" relative flex items-center text-sm justify-between shadow-lg hover:shadow-lg/30 pr-2 pt-1 pb-1 pl-3 border border-[#566AFF] 
                                bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                                text-white rounded-full cursor-pointer gap-8"
                >
                    View Recommendation
                </button>
            </div>
        </div>
    )
}

export default ResultData