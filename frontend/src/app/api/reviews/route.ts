export const revalidate = 0;

import { NextResponse } from 'next/server';

import { POSTReviewsRequest } from '@/shared/api/server/types';
import { getReviewsPostgresql } from '@/shared/api/postgresql/getReviewsPostgresql';
import { postReviewPostgresql } from '@/shared/api/postgresql/postReviewPostgresql';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationId = Number(searchParams.get('location_id')) || null;
  if (!locationId) {
    return NextResponse.json({ message: `Location id is wrong` }, { status: 404 });
  }
  const data = await getReviewsPostgresql(locationId);
  if (!data) {
    return NextResponse.json(
      { message: `Can't get data from database` },
      { status: 500 }
    );
  }
  return NextResponse.json(data.rows, { status: 200 });
}

export async function POST(request: Request) {
  const { userName, rating, reviewText, locationGeoData } =
    (await request.json()) as POSTReviewsRequest;

  const response = await postReviewPostgresql({
    userName,
    rating,
    reviewText,
    locationGeoData,
  });

  if (response) return NextResponse.json({ message: 'Success' }, { status: 200 });
  return NextResponse.json({ message: `Can't get data from database` }, { status: 500 });
}
