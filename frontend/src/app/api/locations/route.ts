export const revalidate = 0;

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

import { ISelectFromLocationsResponse } from '@/shared/api/postgresql/types';
import { GETLocationsResponse } from '@/shared/api/server/types';

async function getLocationsFromDB(): Promise<ISelectFromLocationsResponse> {
  return sql`SELECT * FROM locations;` as unknown as ISelectFromLocationsResponse;
}

export async function GET() {
  const data = await getLocationsFromDB();

  return NextResponse.json({ data: data.rows, status: 200 } as GETLocationsResponse);
}
