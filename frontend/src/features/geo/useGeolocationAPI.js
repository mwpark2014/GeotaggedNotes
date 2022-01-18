import { useEffect } from 'react';
import { GEOLOCATION_OPTIONS } from './MapConstants';

function useGeolocationAPI() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        onGeolocateSuccess,
        onGeolocateFailure,
        GEOLOCATION_OPTIONS,
      );
    }
  }, []);
}

function onGeolocateSuccess({ coords }) {
  const { latitude, longitude } = coords;
  console.log(`lat: ${latitude}, lng: ${longitude}`);
}

function onGeolocateFailure(err) {
  console.error('ERROR(' + err.code + '): ' + err.message);
}

export default useGeolocationAPI;
