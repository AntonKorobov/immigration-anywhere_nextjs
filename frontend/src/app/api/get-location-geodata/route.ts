import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { GETLocationGeodataResponse } from '@/shared/api/server/types';

export async function GET(request: NextRequest) {
  const data: GETLocationGeodataResponse[] = await fetch(
    `http://api.positionstack.com/v1/forward?query=${request.nextUrl.searchParams.get(
      'location'
    )}&access_key=${process.env.NEXT_PUBLIC_GEOLOCATION_ACCESS_KEY}`
  )
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return NextResponse.json(data, {
    status: 200,
  });
}
