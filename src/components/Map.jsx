import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// fix default icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function VenueMap({ lat = 17.9236, lng = 73.6581, address = 'Venue', mapsUrl = '' }) {
  return (
    <MapContainer center={[lat, lng]} zoom={15} style={{ height: '340px', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <strong>{address}</strong>
          <br />
          {mapsUrl && <a href={mapsUrl} target="_blank" rel="noreferrer">Get Directions</a>}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
