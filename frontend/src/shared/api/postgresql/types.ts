export interface ILocation {
  location_id: string;
  location: string;
  country_code: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface ISelectFromLocationsResponse {
  [key: string]: unknown;
  rows: ILocation[];
}
