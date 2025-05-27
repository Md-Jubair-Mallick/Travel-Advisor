import type { PlaceParams } from '@/types';
import axios from 'axios';
import { handleError } from './ApiError';

const API_HOST: string = 'travel-advisor.p.rapidapi.com';
const API_KEY: string = import.meta.env.VITE_RAPIDAPI_KEY;

export const PlaceDetails = async ({ bounds, type, rating, query }: PlaceParams) => {
  // return null
  const isSearch = type === 'auto-complete';

  const method = 'GET';
  const url = isSearch
    ? `https://${API_HOST}/locations/v2/${type}`
    : `https://${API_HOST}/${type}/list-in-boundary`;

  const params = isSearch
    ? {
       query: query || '',
      currency: 'USD',
      units: 'km',
      lang: 'en_US',
    }
    : {
      bl_latitude: bounds?.sw.lat,
      tr_latitude: bounds?.ne.lat,
      bl_longitude: bounds?.sw.lng,
      tr_longitude: bounds?.ne.lng,
      ...(rating && { rating: rating.toString() }),
    };

  const options = {
    method,
    url,
    params,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error: unknown) {
    handleError(error);
    return null;
  }
};
