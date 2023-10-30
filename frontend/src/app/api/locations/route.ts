export const revalidate = 0;

import { NextResponse } from 'next/server';

import {
  GETLocationsResponse,
  POSTLocationRequest,
  POSTLocationResponse,
} from '@/shared/api/server/types';
import { getLocationsPostgresql } from '@/shared/api/postgresql/getLocationsPostgresql'; //TODO write interface
import { postLocationPostgresql } from '@/shared/api/postgresql/postLocationPostgresql';

export async function GET() {
  const data = await getLocationsPostgresql();

  return NextResponse.json({ data: data.rows, status: 200 } as GETLocationsResponse);
}

export async function POST(request: Request) {
  const { locationName, countryId, coordinates } =
    (await request.json()) as unknown as POSTLocationRequest;

  const data = await postLocationPostgresql({ locationName, countryId, coordinates });

  return NextResponse.json({ data: data.rows[0], status: 200 } as POSTLocationResponse);
}
