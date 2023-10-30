export const revalidate = 0;

import { NextResponse } from 'next/server';

import {
  GETReviewsResponse,
  POSTReviewsResponse,
  POSTReviewsRequest,
} from '@/shared/api/server/types';
import { getReviewsPostgresql } from '@/shared/api/postgresql/getReviewsPostgresql';
import { postReviewPostgresql } from '@/shared/api/postgresql/postReviewPostgresql';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationId = Number(searchParams.get('location_id')) || null;
  if (!locationId) {
    return NextResponse.json({ data: [], status: 404 } as GETReviewsResponse); //TODO
  }
  const data = await getReviewsPostgresql(locationId);
  return NextResponse.json({ data: data.rows, status: 200 } as GETReviewsResponse);
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

  return NextResponse.json({
    data: response.rows[0],
    status: 200,
  } as POSTReviewsResponse);
}
