import { useRef, useEffect } from 'react'
import UploadIcon from '../../assets/Dashboard/UploadIcon.png'
import { CircleX } from 'lucide-react'

const UploadReportModal = ({ open, onClose, onFileSelect }) => {
  const modalRef = useRef(null)
  const fileInputRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950/50 bg-opacity-40 z-50">
      <div
        className="bg-white w-[90%] md:w-[45%] xl:w-[500px] xl:h-[500px] rounded-2xl shadow-lg p-6"
        ref={modalRef}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Upload Report</h2>
          <button
            type="button"
            aria-label="Close Modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 focus:outline-none"
          >
            <CircleX className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Box */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="flex flex-col items-center justify-center h-[80%] border-2 border-dashed border-gray-300 rounded-xl py-6 xl:py-0 cursor-pointer"
        >
          <img src={UploadIcon} alt="Upload" className="w-22 h-auto md:w-28 md:h-36 opacity-80" />

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                onFileSelect(e.target.files[0])
                onClose()
              }
            }}
          />

          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation() // ⬅ prevent bubbling
              fileInputRef.current.click()
            }}
          >
            Browse Files
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadReportModal
