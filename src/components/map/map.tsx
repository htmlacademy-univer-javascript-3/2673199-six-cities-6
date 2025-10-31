import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offers } from '../../types/offer.ts';

type MapProps = {
  offers: Offers;
  className: string;
  activeOfferId: string | null;
};

export function Map({ offers, className, activeOfferId }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const city = offers[0]?.city.location;
    if (!city) return;

    const map = L.map(mapRef.current, {
      center: [city.latitude, city.longitude],
      zoom: city.zoom,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    mapInstanceRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);
  }, [offers]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const city = offers[0]?.city.location;
    if (!map || !city) return;

    map.flyTo([city.latitude, city.longitude], city.zoom);
  }, [offers]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersRef.current) return;

    markersRef.current.clearLayers();

    offers.forEach((offer) => {
      const icon = L.icon({
        iconUrl:
          offer.id === activeOfferId
            ? '/img/pin-active.svg'
            : '/img/pin.svg',
        iconSize: [30, 30],
      });

      L.marker(
        [offer.location.latitude, offer.location.longitude],
        { icon }
      ).addTo(markersRef.current!);
    });
  }, [offers, activeOfferId]);

  return <div className={className} ref={mapRef}></div>;
}
