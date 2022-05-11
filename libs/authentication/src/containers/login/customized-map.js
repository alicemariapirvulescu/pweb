
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import './restaurants.css';
import { RootState } from "apps/mycontentful/src/app/reducers";

const CustomizedMap = () => {

  const { restaurant } = useSelector((state) => state.auth)

  const [options, setOptions] = useState(() => {
    return {
        center: { lat: 15.6, lng: 13 },
        zoom: 5
    }
})

const [longitude, setLongitude] = useState();
const [latitude, setLatitude] = useState();
const { restaurants } = useSelector((state) => state.auth)

useEffect(() => {
    getLocation();
}, []);

function getLocation() {
    if (navigator.geolocation) {
        console.log("Calculating geolocation");
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    return
}

function showPosition(position) {
    setOptions({
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 15
    })
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(position);
}

function showError(error) {
    if (error.PERMISSION_DENIED) {
        console.log("Used has denied geolocation");
    }
}

  const renderMarkers = (map, maps) => {
    let res = []

    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new maps.Point(15, 30),
    };

    const image =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    let marker = new maps.Marker({
      position: { lat: parseFloat(restaurant.latitude), lng: parseFloat(restaurant.longitude) },
      map,
      title: restaurant.name,
      icon: svgMarker
    });

    maps.options = {
      disableDefaultUI: false, // disable default map UI
      draggable: false, // make map draggable
      keyboardShortcuts: false, // disable keyboard shortcuts
      scaleControl: false, // allow scale controle
      scrollwheel: false, // allow scroll wheel
    }

    res.concat(marker);

    return res;
  };



  return (

    <div style={{ height: '100vh', width: '100%' }} className='grey'>

      <GoogleMapReact className='grey' 
        key={new Date().getTime()}
        bootstrapURLKeys={{ key: "AIzaSyCVpiO2xVb6JFKp_y0DEJ02OVRhayNyvIw" }}
        center={options.center}
        zoom={options.zoom}
        options={{
          disableDefaultUI: false, // disable default map UI
          draggable: false, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: false, // allow scale controle
          scrollwheel: false, // allow scroll wheel
        }}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}/>

    </div>

  );

}

// Export Google Map component
export default CustomizedMap;