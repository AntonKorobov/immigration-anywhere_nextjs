export const revalidate = 0;

import { NextResponse } from 'next/server';

import { POSTLocationRequest } from '@/shared/api/server/types';
import { getLocationsPostgresql } from '@/shared/api/postgresql/getLocationsPostgresql'; //TODO write interface
import { postLocationPostgresql } from '@/shared/api/postgresql/postLocationPostgresql';

export async function GET() {
  try {
    const data = await getLocationsPostgresql();
    if (data) return NextResponse.json(data.rows, { status: 200 });
    return NextResponse.json(
      { message: `Can't get data from database` },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { locationName, countryId, coordinates } =
    (await request.json()) as unknown as POSTLocationRequest;
  try {
    const response = await postLocationPostgresql({
      locationName,
      countryId,
      coordinates,
    });
    return NextResponse.json({ message: 'Success', success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error, success: false },
      { status: 500 }
    );
  }
}
