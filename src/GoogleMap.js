import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

import L from 'leaflet';


function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  var marker = new L.marker([position],{
    icon: './logo.svg',
    zIndexOffset: 1000 // Adjust the z-index as needed
})

  return position === null ? null : (
    <Marker position={position} icon={marker}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const GoogleMap = () => {
  const [lat, setLat] = useState(0)
  const [long, setlong] = useState(0)
  useEffect(()=> {
    if ("geolocation" in navigator) {
      // Geolocation is available
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log("Latitude: " + latitude + ", Longitude: " + longitude);
        setLat(latitude)
        setlong(longitude)
      }, function(error) {
        // Handle any errors that occur during the request
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      });
    } else {
      // Geolocation is not available in this browser
      console.log("Geolocation is not available in your browser.");
    }
    
  },[])

  

  return (
    <div className='w-[50%] h-screen z-100'>
        <MapContainer style={{width
        :'1000px', height: "600px"}} center={[9.0046464,  38.7678208]} zoom={13} 
          
        scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <LocationMarker />
</MapContainer>
    </div>
  )
}

export default GoogleMap