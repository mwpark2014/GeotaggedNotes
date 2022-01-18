/* global google */
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GMAPS_ZOOM } from './MapConstants';
import './GoogleMap.css';

function GoogleMap({ center }) {
  const [map, setMap] = useState();
  const isGMapInitialized = useSelector(state => state.geo.isGMapInitialized);
  let domNode;

  useEffect(() => {
    if (isGMapInitialized) {
      if (!map) {
        setMap(
          new google.maps.Map(domNode, {
            center,
            zoom: GMAPS_ZOOM,
          }),
        );
      } else {
        map.setCenter(center);
      }
    }
  }, [center, domNode, isGMapInitialized, map]);

  return <div id="map" ref={node => (domNode = node)} />;
}

export default memo(GoogleMap);
