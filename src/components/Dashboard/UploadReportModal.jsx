import { useRef, useEffect, useState } from 'react'
import UploadIcon from '../../assets/Dashboard/UploadIcon.png'
import { CircleX, FileText, X } from 'lucide-react'

const UploadReportModal = ({ open, onClose, onFileSelect }) => {
  const modalRef = useRef(null)
  const fileInputRef = useRef(null)

  const [files, setFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    onFileSelect(files)
    setFiles([])
    setFilePreviews([])
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950/50 bg-opacity-40 z-50">
      <div
        className="bg-white w-[90%] md:w-[45%] xl:w-[500px] rounded-2xl shadow-lg p-6 overflow-y-auto"
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

        {/*  */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            {/*  */}
            <div
              className={`text-center p-6 border-dashed border-2 rounded-lg mb-5 ${
                filePreviews.length
                  ? 'bg-green-50 border-green-300 hover:border-green-400'
                  : 'bg-red-50 border-red-300 hover:border-red-400'
              }`}
            >
              <input
                type="file"
                onChange={(e) => {
                  const files = Array.from(e.target.files)
                  const previews = files.map((file) => ({
                    url: URL.createObjectURL(file),
                    name: file.name,
                    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
                  }))
                  setFiles((prev) => [...prev, ...files])
                  setFilePreviews((prev) => [...prev, ...previews])
                }}
                multiple
                required
                id="files"
                className="absolute opacity-0"
              />
              <label htmlFor="files" className="cursor-pointer">
                <FileText
                  className={`w-12 h-12 mx-auto mb-4 ${
                    filePreviews.length ? 'text-green-400' : 'text-red-400'
                  }`}
                />
                <p
                  className={`font-medium text-lg ${
                    filePreviews.length ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  Upload File(s) *
                </p>
              </label>
            </div>

            {filePreviews.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-gray-900 font-medium">
                  Uploaded Files ({filePreviews.length})
                </h4>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {filePreviews.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border-stone-200 p-3 border rounded-lg relative"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 flex items-center min-w-0 space-x-3">
                          <FileText className="w-5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 font-medium truncate">{file.name}</p>
                            <p className="text-gray-500 text-xs">{file.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setFiles((prev) => prev.filter((_, i) => i !== index))
                            setFilePreviews((prev) => prev.filter((_, i) => i !== index))
                          }}
                          className="text-red-500 cursor-pointer p-1 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {filePreviews.length > 0 && (
            <button className="text-white bg-green-600 font-semibold text-lg cursor-pointer w-full h-11 inline-flex items-center justify-center px-8 py-4 rounded-md focus-visible:outline-none focus-visible:ring-green-500 focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-green-700 ">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default UploadReportModal
