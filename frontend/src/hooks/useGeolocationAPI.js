import { useEffect } from "react";

function useGeolocationAPI() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        onGeolocateSuccess,
        onGeolocateFailure
      );
    }
  }, []);
}

function onGeolocateSuccess({ coords }) {
  const { latitude, longitude } = coords;
  console.log(`lat: ${latitude}, lng: ${longitude}`);
}

function onGeolocateFailure(err) {
  console.error("ERROR(" + err.code + "): " + err.message);
}

export default useGeolocationAPI;
