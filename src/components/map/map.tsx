import {useRef, useEffect} from 'react';
import { Icon, Marker } from 'leaflet';
import type { City, Location } from '../../types/types';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  locations: Location[];
  places: 'cities' | 'property';
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const Map = ({ city, locations, places = 'cities' }: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      locations.forEach(({ latitude: lat, longitude: lng }) => {
        const marker = new Marker({
          lat,
          lng
        });

        marker
          .setIcon(defaultCustomIcon)
          .addTo(map);

        markers.push(marker);
      });

      map.fitBounds([[city.location.latitude, city.location.longitude]], {
        maxZoom: city.location.zoom
      });

      return () => {
        if (map) {
          markers.forEach((marker) => {
            map.removeLayer(marker);
          });
        }
      };
    }
  }, [map, city, locations]);

  return <section className={`${places}__map map`} ref={mapRef} />;
};

export default Map;
