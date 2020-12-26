import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

// Material ui core
import Tooltip from "../components/Tooltip";
import clientMarker from '../assets/clientMarker.png'

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";
const initiLocation = [0, 0];
// Initialize
navigator.geolocation.getCurrentPosition(
  (position) => {
    initiLocation[0] = position.coords.longitude;
    initiLocation[1] = position.coords.latitude;
  },
  (err) => {},
  { enableHighAccuracy: true }
);

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const [long, setLng] = useState(initiLocation[0]);
  const [lat, setLat] = useState(initiLocation[1]);
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map(
      {
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [long, lat],
        zoom: zoom
      },
      []
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", (e) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });

    // add tooltip when users mouse move over a point
   //  map.on("mousemove", (e) => {
   //    const features = map.queryRenderedFeatures(e.point);
   //    if (features.length) {
   //      const feature = features[0];

   //      // Create tooltip node
   //      const TooltipNode = document.createElement("div");
   //      ReactDOM.render(<Tooltip feature={feature} />, TooltipNode);

   //      // Set tooltip on map
   //      tooltipRef.current
   //        .setLngLat(e.lngLat)
   //        .setDOMContent(TooltipNode)
   //        .addTo(map);
   //    }
   //  });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {long} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div style={{height:'25rem'}} ref={mapContainerRef} />
    </div>
  );
};

export default Map;