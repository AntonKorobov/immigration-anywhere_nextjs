import { ILocation } from '../postgresql/types';

export interface GETLocationGeodataResponse {
  data: {
    latitude: null | number;
    longitude: null | number;
    label: null | string;
    name: null | string;
    type: null | string;
    number: null | string;
    street: null | string;
    postal_code: null | string;
    confidence: null | number;
    region: null | string;
    region_code: null | string;
    administrative_area: null | string;
    neighbourhood: null | string;
    country: null | string;
    country_code: null | string;
    map_url: null | string;
  }[];
}

export interface POSTLocationRequest {
  coordinates: { latitude: string; longitude: string };
  locationName: string;
  countryId: string;
}

export interface GETLocationsResponse {
  data: ILocation[];
  status: number;
}
