import React from 'react'
import logoBac from "../../assets/logo-bac.png";
import ReceiptImage from "../../assets/Dashboard/Receipt.png";
// import humsafarLogo from '../../assets/humsafar_logo.png'
import humsafarLogo from '../../assets/HumsafarLogo1.png'
const Receipt = () => {
    return (
        <div style={{fontFamily:"Sofia Pro" , fontWeight:400}} >
            {/* Top Logos and Headers */}
            <div className="pt-6 px-6 ">
                <div className="flex items-center justify-between">
                    {/* Left Logo Placeholder */}
                    <div className=" w-50 flex items-center justify-center rounded flex-col gap-3">
                        <img src={logoBac} alt="Netreach Logo" className="h-9" />
                        <div className="text-[#C4C4C4] text-[14px] ">Reaching The Missing Millions</div>
                    </div>
                    {/* Right Logo Placeholder */}
                    <div className="  flex items-center justify-center rounded">
                        <img src={humsafarLogo} alt="Humsafar Trust" className="h-14" />
                    </div>
                </div>
            </div>

            {/* Section Heading */}
            <div className="mt-10">
                <div className="border-t-[18px] border-[#1475A1] relative">
                    <span className="absolute -top-5 left-1/2 translate-x-1/6 bg-white px-3 text-[#1475A1] font-semibold tracking-wide text-sm " >
                        E-REFERRAL SLIP
                    </span>
                </div>
            </div>

            {/* Client and Date Row */}
            <div className="flex justify-between items-center mt-5 px-6">
                <div>
                    <span className="font-semibold">Client Name</span>
                    <div className="text-sm">Yukti Aggarwal</div>
                </div>
                <div className="text-right">
                    <div><span className="font-semibold">Date:</span> 2025-08-19</div>
                    <div className="text-sm mt-1">
                        <span className="font-semibold">Netreach UID:</span> NETREACH/HR/SELF/7464
                    </div>
                </div>
            </div>

            {/* Provider Details */}
            <div className="mt-5 mx-6 rounded overflow-hidden">
                <div className="flex bg-[#F2F2F2] px-4 py-2 font-semibold text-sm">
                    <div className="flex-1">Service Provider Name/Address</div>
                    <div className="flex-1 text-center">Government Dispensary Sec 4</div>
                </div>
                <div className="flex px-4 py-2  text-sm">
                    <div className="flex-1 font-medium">Appointment Date</div>
                    <div className="flex-1 text-center">2025-08-20</div>
                </div>
            </div>

            {/* Type of services section */}
            <div className="mt-5 mx-6  rounded overflow-hidden">
                <div className="bg-[#F2F2F2] px-4 py-2 font-semibold text-sm">
                    Type of services selected
                </div>
                <ul className="px-7 py-3 text-sm list-disc space-y-1">
                    <li>HIV Test</li>
                    <li>STI Services</li>
                    <li>PEP</li>
                </ul>
            </div>

            {/* Contact & Slip Info */}
            <div className="flex justify-between items-center mt-2 px-6 text-sm">
                <div>
                    <span className="">VN Name:</span> Manoj
                </div>
                <div>
                    <span className="">VN Mobile:</span> 9876543210
                </div>
            </div>
            <div className="mt-2 px-6 text-sm">
                <span className="">E-Referral Slip No.:</span> 190073027017301
            </div>

            {/* Bottom Image and Info */}
            <div className="flex flex-col items-center mt-4">
                {/* Bottom Image Placeholder */}
                <div className="w-40 h-32  rounded flex items-center justify-center">
                    <img src={ReceiptImage} alt="Bottom Graphic" className="h-full" />
                </div>
            </div>

            {/* Footnote */}
            <div className="text-xs text-black text-left mt-3 mb-3 px-6">
               *Generally the Testing Centre Is Open Between 9am to 6pm
            </div>

        </div>
    )
}

export default Receipt