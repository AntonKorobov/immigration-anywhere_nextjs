import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { GETLocationGeoDataResponseFull } from '@/shared/api/server/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locationName = searchParams.get('location');

  if (locationName) {
    const request: GETLocationGeoDataResponseFull = await fetch(
      `http://api.positionstack.com/v1/forward?query=${locationName}&access_key=${process.env.NEXT_PUBLIC_GEOLOCATION_ACCESS_KEY}`
    )
      .then((res) => res.json())
      .catch((error) => console.error(error));

    const response = {
      locationName: request.data[0].name,
      coordinates: { x: request.data[0].latitude, y: request.data[0].longitude },
      countryId: request.data[0].country_code,
    };
    return NextResponse.json([response], {
      status: 200,
    });
  } else {
    return NextResponse.json([], {
      status: 404,
    });
  }
}
