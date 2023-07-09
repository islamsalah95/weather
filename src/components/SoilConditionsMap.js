import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SoilConditionsMap = ({ soilData }) => {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (soilData && soilData.length > 0) {
      setMapCenter([soilData[0].latitude, soilData[0].longitude]);
    }
  }, [soilData]);

  return (
    <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {soilData.map((data, index) => (
        <Marker key={index} position={[data.latitude, data.longitude]}>
          <Popup>
            Soil Type: {data.soilType} <br />
            Moisture: {data.moisture}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SoilConditionsMap;