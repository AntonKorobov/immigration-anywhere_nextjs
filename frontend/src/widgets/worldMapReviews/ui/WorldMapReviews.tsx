'use client';

import style from './WorldMapReviews.module.scss';

import { useState } from 'react';
import { SWRConfig } from 'swr';

import { WorldMap } from '@/entities/worldMap/ui';
import { Reviews } from '@/widgets/reviews/';
import { useGetLocations } from '@/shared/api/server/useGetLocations';
import { Loading } from '@/shared/ui/loading';

export function WorldMapReviews() {
  const { locations, locationsError, locationsIsLoading } = useGetLocations();
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState<number | null>(null);
  const [currentLocationName, setCurrentLocationName] = useState<string>('');

  return (
    <SWRConfig>
      <div className={style.worldMap}>
        {locationsIsLoading && (
          <div className={style.spinnerWrapper}>
            <Loading />
          </div>
        )}
        <WorldMap
          locations={locations || []}
          onMarkerClick={(locationId, locationName) => {
            setCurrentLocationId(locationId);
            setCurrentLocationName(locationName);
            setIsReviewsOpen(true);
          }}
        />
        <Reviews
          isOpen={isReviewsOpen}
          locationId={currentLocationId || NaN}
          locationName={currentLocationName}
          onClose={() => {
            setIsReviewsOpen(false);
            setCurrentLocationId(null);
            setCurrentLocationName('');
          }}
        />
      </div>
    </SWRConfig>
  );
}
