import { TileLayer , MapContainer , Marker , Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import markerIconURL from '../assets/pointer.svg';
import L from 'leaflet'

interface CurrentLocation {
  latitude:number
  longitude:number,
  display_name:string
}

interface props {
  location: CurrentLocation
}

export default function Map( { location }: props) {

  const currentCity: CurrentLocation = location;
  const markerIcon = new L.Icon({
    iconUrl: markerIconURL,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });
  return (
    <MapContainer center={[0,0]} zoom={ 2 } scrollWheelZoom={false}>

    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Marker icon={ markerIcon } position={[ location.latitude, location.longitude ]}>
            <Popup>
            { currentCity.display_name }
            </Popup>      
    </Marker>
</MapContainer>
)
}