import React, { useEffect, useState } from "react";
import ReactMapGL,{Marker,Popup} from "react-map-gl";
import Checkbox from '@material-ui/core/Checkbox'

import SvgIcon from '../components/SvgIcon'
import {ReactComponent as PinOn } from '../assets/pinMapOn.svg'
import {ReactComponent as PinOff } from '../assets/pinMapOff.svg'
import {ReactComponent as ClientMarker } from '../assets/clientMarker.svg'
import { MenuItem, TextField } from "@material-ui/core";

const initiLocation = [0, 0];

const Map = () => {

  const [mapViewport, setMapViewport] = useState({
    height: "100vh",
    width: "100wh",
    longitude: initiLocation[0],
    latitude: initiLocation[1],
    zoom: 11
  });
  const [allowAddPin, setAllowAddPin] = useState(false)
  const [clientMarkers, setClientMarker] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  const [spot, setSpot] = useState(0)


  useEffect(()=>{
   navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapViewport({...mapViewport,
         longitude:position.coords.longitude,
         latitude:position.coords.latitude
      })
      },
      (err) => {},
      { enableHighAccuracy: true }
    );
  },[])

  const handleAllowAddPin = event =>{
     setAllowAddPin(event.target.checked)
  }

  return (
     <>
     <Checkbox onChange={handleAllowAddPin} icon={<SvgIcon svg={PinOff} viewBox={'0 0 32 32'} fontSize='5rem' />} checkedIcon={<SvgIcon svg={PinOn} viewBox={'0 0 32 32'} fontSize='5rem'/>} name="addClient" />
      <ReactMapGL
         {...mapViewport}
         mapboxApiAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
         mapStyle="mapbox://styles/mapbox/streets-v11"
         onViewportChange={setMapViewport}
         onClick={x => {
            if(allowAddPin&&x.srcEvent.which===1){
               console.log(x.lngLat)
               setClientMarker([...clientMarkers,{longitude:x.lngLat[0],latitude:x.lngLat[1]}])
            }
         }}
      >
      {clientMarkers.map((marker, index) => (
        <Marker
          key={index}
          offsetTop={-48}
          offsetLeft={-24}
          longitude={marker.longitude}
          latitude={marker.latitude}
        >
          <SvgIcon onClick={()=>setSelectedClient(marker)} svg={ClientMarker} fontSize='3rem' />
        </Marker>
      ))}
      {selectedClient&&<Popup
        latitude={parseFloat(selectedClient.latitude)}
        longitude={parseFloat(selectedClient.longitude)}
        offsetLeft={25}
        offsetTop={-50}
        onClose={()=>setSelectedClient(null)}
      >
        <p>HotSpot Information</p>
        <TextField
          select
          label="number spot"
          value={spot}
          onChange={event=>setSpot(event.target.value)}
          helperText="Please select your currency"
        >
          {[0,5,10,20].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Popup>}
      </ReactMapGL>
    </>
  );
};

export default Map;