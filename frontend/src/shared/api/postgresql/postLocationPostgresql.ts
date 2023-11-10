import { sql } from '@vercel/postgres';

import { IGetLocationsPostgresqlResponse, IPostLocationPostgresqlRequest } from './types';

export async function postLocationPostgresql({
  locationName,
  countryId,
  coordinates,
}: IPostLocationPostgresqlRequest): Promise<IGetLocationsPostgresqlResponse> {
  return sql`INSERT INTO locations (location_name, country_code, coordinates) VALUES (${locationName}, ${countryId}, (point(${coordinates.x},${coordinates.y})));` as unknown as IGetLocationsPostgresqlResponse;
}
