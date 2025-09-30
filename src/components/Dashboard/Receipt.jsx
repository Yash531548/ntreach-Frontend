import { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from '../../Context/AuthContext';
import logoBac from "../../assets/logo-bac.png";
import ReceiptImage from "../../assets/Dashboard/Receipt.png";
// import humsafarLogo from '../../assets/humsafar_logo.png'
import humsafarLogo from '../../assets/HumsafarLogo1.png'
const Receipt = ({ appointment }) => {
    const componentRef = useRef();
    const handleDownload = async () => {
        const element = componentRef.current;
        const canvas = await html2canvas(element, { scale: 2 }); // higher scale = better quality
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Calculate width & height for A4
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Appointment.pdf");
    };

    // Run download automatically when component mounts
    useEffect(() => {
        handleDownload();
    }, []);

    const { user } = useAuth();
    console.log(appointment)

    return (
        <div ref={componentRef} style={{fontFamily:"Sofia Pro" , fontWeight:400}} >
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
                    <div className="text-sm">{user.user?.name}</div>
                </div>
                <div className="text-right">
                    <div><span className="font-semibold">Date:</span> {new Date().toISOString().split('T')[0]}</div>
                    <div className="text-sm mt-1">
                        <span className="font-semibold">Netreach UID:</span> {appointment?.unique_id || 'N/A'}
                    </div>
                </div>
            </div>

            {/* Provider Details */}
            <div className="mt-5 mx-6 rounded overflow-hidden">
                <div className="flex bg-[#F2F2F2] px-4 py-2 font-semibold text-sm">
                    <div className="flex-1">Service Provider Name/Address</div>
                    <div className="flex-1 text-center">{appointment?.center_name} <br /> {appointment?.address}</div>
                </div>
                <div className="flex px-4 py-2  text-sm">
                    <div className="flex-1 font-medium">Appointment Date</div>
                    <div className="flex-1 text-center">{appointment?.appointment_data?.appoint_date}</div>
                </div>
            </div>

            {/* Type of services section */}
            <div className="mt-5 mx-6  rounded overflow-hidden">
                <div className="bg-[#F2F2F2] px-4 py-2 font-semibold text-sm">
                    Type of services selected
                </div>
                <ul className="px-7 py-3 text-sm list-disc space-y-1">
                    {appointment?.serviceNames?.map((service) => (
                        <li>{service}</li>
                    ))}
                </ul>
            </div>

            {/* Contact & Slip Info */}
            <div className="flex justify-between items-center mt-2 px-6 text-sm">
                <div>
                    <span className="">VN Name:</span> {appointment?.vn_details?.name || 'N/A'}
                </div>
                <div>
                    <span className="">VN Mobile:</span> {appointment?.vn_details?.mobile_number || 'N/A'}
                </div>
            </div>
            <div className="mt-2 px-6 text-sm">
                <span className="">E-Referral Slip No.:</span> {appointment?.appointment_data?.e_referral_no || 'N/A'}
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