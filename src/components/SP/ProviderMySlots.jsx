import { useState, useEffect, useCallback } from 'react'
import api from '../../Api/api'

const ProviderMySlots = () => {
  const [slots, setSlots] = useState([])

  // Fetch slots (flattened for UI)
  const getSlots = useCallback(async () => {
    try {
      const res = await api.get('get_time_slot')

      // Flatten the data: one entry per time slot
      const flattened = res.data.data.flatMap((day) =>
        day.time_slots.map((slot) => ({
          date: day.date,
          startTime: slot.start_time,
          endTime: slot.end_time,
          meetLink: '' // Add field if you want to store meeting links
        }))
      )

      setSlots(flattened)
      console.log('Flattened Slots:', flattened)
    } catch (err) {
      console.error(err.response?.data?.message || err.message)
    }
  }, [])

  useEffect(() => {
    // getSlots()
  }, [getSlots])

  // Add new slot
  const addSlot = () => setSlots([...slots, { date: '', startTime: '', endTime: '', meetLink: '' }])

  // Handle field change
  // Update handleChange
  const handleChange = (index, field, value) => {
    const updated = [...slots]
    updated[index][field] = value

    // If startTime changes, auto-update endTime +20 mins
    if (field === 'startTime' && value) {
      const [hours, minutes] = value.split(':').map(Number)
      let endMinutes = minutes + 20
      let endHours = hours + Math.floor(endMinutes / 60)
      endMinutes = endMinutes % 60

      // Pad with leading zeros
      const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
      updated[index].endTime = endTime
    }

    setSlots(updated)
  }

  // Update slots (group by date for API)
  const updateSlots = async (e) => {
    e.preventDefault()

    try {
      // Group slots by date
      const grouped = slots.reduce((acc, slot) => {
        const { date, startTime, endTime, meetLink, availability_id } = slot
        if (!acc[date]) acc[date] = []
        acc[date].push({
          start_time: startTime,
          end_time: endTime,
          meet_link: meetLink // if your API accepts this
        })
        return acc
      }, {})

      // Convert to array format expected by API
      const payload = {
        days: Object.entries(grouped).map(([date, time_slots]) => ({
          date,
          time_slots
        }))
      }
      // console.log(payload)

      const res = await api.post('add_time_slot', payload)
      // console.log(res.data)

      // Flatten response safely
      const updatedSlots = (res.data.days || []).flatMap((day) =>
        day.time_slots.map((slot) => ({
          date: day.date,
          startTime: slot.start_time,
          endTime: slot.end_time,
          meetLink: slot.meet_link
        }))
      )
      setSlots(updatedSlots)

      alert('Slots saved successfully!')
    } catch (err) {
      console.error(err.response?.data?.message || err.message)
      alert(err.response?.data?.message || err.message)
    }
  }

  return (
    <form onSubmit={updateSlots} className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold mb-4">My Slots</h1>

      <button
        onClick={addSlot}
        className="w-full max-w-sm bg-black text-white px-4 py-3 rounded cursor-pointer"
      >
        Add Slot
      </button>

      {slots.map((slot, i) => (
        <div key={i} className="border border-gray-200 p-4 mt-3 rounded-md bg-gray-50">
          {/* Date */}
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <input
            type="date"
            value={slot.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => handleChange(i, 'date', e.target.value)}
            required
            className="border border-gray-300 px-2 py-1 rounded w-full mb-2"
          />

          {/* Start & End Time */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                min="10:00"
                max="18:00"
                value={slot.startTime}
                onChange={(e) => handleChange(i, 'startTime', e.target.value)}
                required
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) => handleChange(i, 'endTime', e.target.value)}
                readOnly
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </div>
          </div>

          {/* Meeting Link */}
          <label className="block text-sm font-medium mt-3 mb-1">Meeting Link</label>
          <input
            type="url"
            placeholder="Paste link here"
            value={slot.meetLink}
            onChange={(e) => handleChange(i, 'meetLink', e.target.value)}
            required
            className="border border-gray-300 px-2 py-1 rounded w-full"
          />
        </div>
      ))}

      {slots.length > 0 && (
        <button className="w-full max-w-sm mt-4 px-4 py-3 bg-black text-white rounded cursor-pointer">
          Save Slots
        </button>
      )}
    </form>
  )
}

export default ProviderMySlots
