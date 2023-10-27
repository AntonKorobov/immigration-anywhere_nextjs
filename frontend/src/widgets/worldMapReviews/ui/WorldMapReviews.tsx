'use client';

import style from './WorldMapReviews.module.scss';

import { useGetLocations } from '../';
import { WorldMap } from '@/entities/worldMap/ui';

export function WorldMapReviews() {
  const [locations] = useGetLocations();

  return (
    <div className={style.worldMap}>
      <WorldMap locations={locations} />
    </div>
  );
}
