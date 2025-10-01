import { useState, useEffect } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const RecenterMap = ({ position }) => {
  const map = useMap()
  useEffect(() => {
    map.setView(position, map.getZoom()) // Keep current zoom
  }, [position, map])
  return null
}

const DynamicMap = ({ selected }) => {
  console.log(selected)
  const [position, setPosition] = useState([28.6139, 77.209]) // Default: Delhi

  useEffect(() => {
    if (!selected) return
    const fetchPosition = async () => {
      try {
        const { data } = await axios.get(`https://nominatim.openstreetmap.org/search?format=json`, {
          params: { q: selected }
        })
        console.log(data)
        if (data.length) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)])
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchPosition()
  }, [selected])

  // Manually create a custom icon to avoid broken default marker image
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>{selected || 'Selected Center'}</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  )
}

export default DynamicMap
