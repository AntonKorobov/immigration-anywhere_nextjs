'use client';

import './WorldMap.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import style from './WorldMap.module.scss';

import Map, { Marker } from 'react-map-gl';
import { useEffect, useMemo, useState } from 'react';
import { getLocations } from '@/shared/api/server/getLocations';
import { ILocation } from '@/shared/api/postgresql/types';
import Pin from './Pin';

export function WorldMap() {
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    async function downloadLocations() {
      const { data } = await getLocations();
      setLocations(data);
    }
    downloadLocations();
  }, []);

  const pins = useMemo(
    () =>
      locations?.map((location) => (
        <Marker
          key={location.location_id}
          longitude={Number(location.coordinates.y)}
          latitude={Number(location.coordinates.x)}
          anchor="bottom"
          onClick={() => {
            console.log(location.location);
          }}
        >
          <Pin />
        </Marker>
      )),
    [locations]
  );

  return (
    <div className={style.worldMap}>
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
    </div>
  );
}
