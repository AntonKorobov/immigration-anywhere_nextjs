'use client';

import './worldMap.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import style from './worldMap.module.scss';

import Map from 'react-map-gl';

export function WorldMap() {
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
        {}
      </Map>
    </div>
  );
}
