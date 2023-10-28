import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

import { ISelectFromReviewsResponse } from '@/shared/api/postgresql/types';
import { GETReviewsResponse } from '@/shared/api/server/types';

async function getReviewsFromDB(
  location_id: number | null
): Promise<ISelectFromReviewsResponse> {
  return sql`SELECT * FROM reviews WHERE location_id=${location_id};` as unknown as ISelectFromReviewsResponse;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location_id = Number(searchParams.get('location_id')) || null;

  const data = await getReviewsFromDB(location_id);

  return NextResponse.json({ data: data.rows, status: 200 } as GETReviewsResponse);
}
