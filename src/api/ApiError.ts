import type { AxiosError } from "axios";

export const handleError = (error: unknown) => {
  const axiosError = error as AxiosError;
  const status = axiosError.response?.status;

  switch (status) {
    case 403:
      console.error('Access forbidden: Check API key and permissions.');
      break;
    case 429:
      console.error('Quota exceeded: Upgrade your plan or try later.');
      break;
    default:
      console.error('Unexpected error fetching places:', error);
  }
};
