import { useState, useEffect, useCallback, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import api from '../../Api/api'

const Modal = ({ open, onClose, children }) => {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
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
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [filterBy, setFilterBy] = useState('all')
  const [modal, setModal] = useState({ open: false, mode: '', appt: null })
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadedTranscripts, setUploadedTranscripts] = useState({})

  // Fetch appointments
  const getAppointments = useCallback(async () => {
    try {
      const res = await api.get('sp/past_booking')
      setAppointments(res.data.past || [])
      console.log(res.data.past)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    getAppointments()
  }, [getAppointments])

  // Open modal
  const openModal = (mode, appt) => {
    setModal({ open: true, mode, appt })
    setTranscript(appt?.transcript || '')
  }

  const closeModal = () => setModal({ open: false, mode: '', appt: null })

  // Filter & sort
  const filtered = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // ignore time, compare only date

    let data = appointments
      // Search filter
      .filter((a) =>
        String(a.patient_name || a.patient_id)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      // Filter by type
      .filter((a) => (filterBy !== 'all' ? a.type.toLowerCase().includes(filterBy) : true))
      // Only past dates
      .filter((a) => {
        const [year, month, day] = a.date.split('-') // assuming format 'YYYY-MM-DD'
        const apptDate = new Date(year, month - 1, day)
        return apptDate < today
      })

    // Sorting
    if (sortBy === 'date') {
      data.sort((a, b) => {
        const [ay, am, ad] = a.date.split('-')
        const [by, bm, bd] = b.date.split('-')
        return new Date(by, bm - 1, bd) - new Date(ay, am - 1, ad)
      })
    } else {
      data.sort((a, b) =>
        String(a.patient_name || a.patient_id).localeCompare(b.patient_name || b.patient_id)
      )
    }

    return data
  }, [appointments, search, sortBy, filterBy])

  const uploadTranscript = async () => {
    if (!modal.appt || !transcript) {
      alert('Transcript is empty!')
      return
    }

    setLoading(true) // start loading

    const blob = new Blob([transcript], { type: 'text/plain' })
    const file = new File([blob], 'transcript.txt', { type: 'text/plain' })

    const formData = new FormData()
    formData.append('booking_id', modal.appt.booking_id)
    formData.append('language', 'English')
    formData.append('transcript', file)

    try {
      const res = await api.post('/sp/upload_transcript', formData)

      setUploadedTranscripts((prev) => ({
        ...prev,
        [modal.appt.booking_id]: true
      }))

      alert('Transcript uploaded successfully!')
      console.log('Success:', res.data)
      closeModal()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload transcript. Please try again.')
      console.error('Upload failed:', err)
    } finally {
      setLoading(false) // end loading
    }
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg w-full h-full">
      <h1 className="text-xl font-semibold mb-4">Past Appointments</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="relative md:w-1/3">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="date">Sort by: Date</option>
            <option value="name">Sort by: Name</option>
          </select>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">View by Type: All</option>
            <option value="audio">Audio Teleconsultation</option>
            <option value="video">Video Teleconsultation</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[70vh] rounded-md shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="text-xs text-gray-600 border-b border-gray-300">
            <tr>
              <th className="py-2 px-3">SL.No</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Patient</th>
              <th className="py-2 px-3">Type of Consultation</th>
              <th className="py-2 px-3">Time Slot</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {filtered.map((a, i) => (
              <tr key={a.booking_id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-3">{String(i + 1).padStart(2, '0')}</td>
                <td className="py-2 px-3">{a.date}</td>
                <td className="py-2 px-3 capitalize">{a.patient_name || a.patient_id}</td>
                <td className="py-2 px-3 capitalize">{a.type}</td>
                <td className="py-2 px-3">
                  {a.start_time}–{a.end_time}
                </td>
                <td className="py-2 px-3 flex flex-col md:flex-row gap-1">
                  {!a.transcript && !uploadedTranscripts[a.booking_id] ? (
                    <button
                      className="hover:underline cursor-pointer"
                      onClick={() => openModal('get_summary', a)}
                    >
                      Get Summary
                    </button>
                  ) : (
                    <></>
                  )}
                  {/* <button
                    className="hover:underline cursor-pointer"
                    onClick={() => openModal(a.summary ? 'view_summary' : 'get_summary', a)}
                  >
                    {a.summary ? 'View Summary' : 'Get Summary'}
                  </button> */}
                  <button
                    className="hover:underline cursor-pointer"
                    onClick={() => openModal('view_detail', a)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal open={modal.open} onClose={closeModal}>
        {modal.appt && modal.mode === 'view_detail' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Meeting Info</h3>
            <hr className="mb-4" />
            <div className="mb-3">
              <div className="text-[13px] text-gray-600">Patient</div>
              <div className="text-sm">{modal.appt.patient_name || modal.appt.patient_id}</div>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[13px] text-gray-600">Date</div>
                <div className="text-sm">{modal.appt.date}</div>
              </div>
              <div>
                <div className="text-[13px] text-gray-600">Time</div>
                <div className="text-sm">
                  {modal.appt.start_time}–{modal.appt.end_time}
                </div>
              </div>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[13px] text-gray-600">Type of Consultation</div>
                <div className="text-sm capitalize">{modal.appt.type}</div>
              </div>
              <div>
                <div className="text-[13px] text-gray-600">Service</div>
                <div className="text-sm capitalize">
                  {modal.appt.service?.replace(/_/g, ' ') || '—'}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-[13px] text-gray-600">Meeting Link</div>
              <div className="text-sm break-all">{modal.appt.meeting_link || '—'}</div>
            </div>
            <a
              href={modal.appt.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm flex justify-center"
            >
              Join Link
            </a>
          </div>
        )}

        {modal.appt && modal.mode === 'get_summary' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Get Summary</h3>
            <hr className="mb-4" />
            <textarea
              rows={8}
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste transcript here"
            />
            <button
              className={`px-6 py-2 rounded-md text-white cursor-pointer ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={uploadTranscript}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Input / Get Summary'}
            </button>
          </div>
        )}

        {modal.appt && modal.mode === 'view_summary' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Appointment Summary</h3>
            <hr className="mb-4" />
            <div className="mb-2">
              <div className="text-[13px] text-gray-600">Transcript</div>
              <div className="text-sm whitespace-pre-wrap">{modal.appt.transcript || '—'}</div>
            </div>
            <div>
              <div className="text-[13px] text-gray-600">Summary</div>
              <div className="text-sm whitespace-pre-wrap">{modal.appt.summary || '—'}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ProviderPastAppointments
