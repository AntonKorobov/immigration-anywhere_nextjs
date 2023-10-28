'use client';

import './WorldMap.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useMemo } from 'react';
import Map, { Marker } from 'react-map-gl';

import { ILocation } from '@/shared/api/postgresql/types';
import { WorldMapPin } from '../worldMapPin/WorldMapPin';

interface IWorldMapProps {
  locations: ILocation[];
  onMarkerClick: (locationId: number | null, locationName: string) => void;
}

export function WorldMap({ locations, onMarkerClick }: IWorldMapProps) {
  const pins = useMemo(
    () =>
      locations?.map((location) => (
        <Marker
          key={location.location_id}
          longitude={Number(location.coordinates.y)}
          latitude={Number(location.coordinates.x)}
          anchor="bottom"
          onClick={() => onMarkerClick(location.location_id, location.location_name)}
        >
          <WorldMapPin />
        </Marker>
      )),
    [locations]
  );

  return (
    <Map
      initialViewState={{
        latitude: 53.893,
        longitude: 27.567,
        zoom: 2,
        bearing: 0,
        pitch: 0,
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/newanton/clbwa240n008014o9alqq0tt7"
      // mapStyle="mapbox://styles/mapbox/light-v11" //default style
      projection={{
        name: 'globe',
      }}
    >
      {pins}
    </Map>
  );
}
