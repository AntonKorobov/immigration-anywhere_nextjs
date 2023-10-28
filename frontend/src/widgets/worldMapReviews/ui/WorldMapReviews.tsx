'use client';

import style from './WorldMapReviews.module.scss';

import { useState } from 'react';

import { useGetLocations } from '../';
import { WorldMap } from '@/entities/worldMap/ui';
import { Reviews } from '@/widgets/reviews/ui/Reviews';

export function WorldMapReviews() {
  const [locations] = useGetLocations();
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState<number | null>(null);
  const [currentLocationName, setCurrentLocationName] = useState<string>('');

  return (
    <div className={style.worldMap}>
      <WorldMap
        locations={locations}
        onMarkerClick={(locationId, locationName) => {
          setCurrentLocationId(locationId);
          setCurrentLocationName(locationName);
          setIsReviewsOpen(true);
        }}
      />
      {currentLocationId && (
        <Reviews
          isOpen={isReviewsOpen}
          locationId={currentLocationId}
          locationName={currentLocationName}
          onClose={() => {
            setIsReviewsOpen(false);
            setCurrentLocationId(null);
            setCurrentLocationName('');
          }}
        />
      )}
    </div>
  );
}
