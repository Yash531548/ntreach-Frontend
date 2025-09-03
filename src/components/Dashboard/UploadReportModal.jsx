
import React, { useRef, useEffect } from "react";
import UploadIcon from "../../assets/Dashboard/UploadIcon.png"; // ✅ adjust path as needed
import { CircleX } from "lucide-react";

const UploadReportModal = ({ open, onClose }) => {
    const modalRef = useRef(null);
    const fileInputRef = useRef(null);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose]);

    // Handle file upload and close modal
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            console.log("File uploaded:", event.target.files[0]);
            onClose(); // Auto-close modal after file selection
        }
    };

    if (!open) return null;

    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-950/50 z-50">
        //     <div
        //         ref={modalRef}
        //         className="bg-white w-[500px] h-[500px] rounded-2xl shadow-lg flex flex-col items-center justify-start cursor-pointer p-6"
        //         onClick={() => fileInputRef.current.click()} // ✅ entire box clickable
        //     >
        //         {/* Title at the top */}
        //         <h2 className="text-lg font-semibold mb-6 self-start">Upload Report</h2>

        //         {/* Hidden file input */}
        //         <input
        //             type="file"
        //             ref={fileInputRef}
        //             className="hidden"
        //             onChange={handleFileChange}
        //         />

        //         {/* Centered Upload Icon */}
        //         <div className="flex flex-1 items-center justify-center w-full">
        //             <img src={UploadIcon} alt="Upload" className="w-32 h-32 opacity-80" />
        //         </div>
        //     </div>
        // </div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-950/50 bg-opacity-40 z-50">
            <div
                // ref={modalRef}
                className="bg-white w-[90%] md:w-[45%] xl:w-[500px] xl:h-[500px] rounded-2xl shadow-lg p-6 cursor-pointer"
                // onClick={() => fileInputRef.current.click()} // ✅ entire box clickable
            >
                {/* <div className="flex justify-between">
                    <h2 className="text-lg font-semibold mb-4">Upload Report</h2>
                </div> */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-4">Upload Report</h2>
                    <button
                        type="button"
                        aria-label="Close Modal"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 hover:cursor-pointer focus:outline-none ml-2"
                        tabIndex={0}
                    >
                        <CircleX className="w-6 h-6" />
                    </button>
                </div>

                <div
                ref={modalRef}
                onClick={()=>fileInputRef.current.click()} 
                className="flex flex-col items-center justify-center h-[80%] border-2 border-dashed border-gray-300 rounded-xl py-6 xl:py-0">
                    <img src={UploadIcon} alt="Upload" className="w-22 h-auto md:w-28 md:h-36 opacity-80" />
                    {/* <p className="mt-3 text-gray-600">Drag & drop your report here</p> */}

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <button
                        className="mt-4 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Browse Files
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadReportModal;
