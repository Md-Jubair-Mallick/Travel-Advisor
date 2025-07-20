import type { searchSchema } from "@/schemas";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

export type SearchInput = z.infer<typeof searchSchema>

export type SuggestionCardProps = {
  filteredSuggestions: string[],
  form: UseFormReturn<SearchInput>,
  onSubmit: (item: SearchInput) => void
}


// src/types.ts
export type Coordinates = {
  lat: number;
  lng: number;
};

export type Bounds = {
  ne: Coordinates;
  sw: Coordinates;
};

export type MapProps = {
  coordinates: Coordinates;
  setCoordinates: (coords: Coordinates) => void;
  setBounds: (bounds: Bounds) => void;
  className?: string;
  placeDetails?: PlaceDetailsTypes[] | null;
  setSelectedPlace: (index: number | null) => void;
};
export type PlaceParams = {
  bounds?: Bounds;
  coordinates?: Coordinates;
  type?: string;
  rating?: string;
  query?: string;
};

export type PlaceDetailsTypes = {
  name: string
  location_id?: string
  latitude: string
  longitude: string
  rating: number
  num_reviews: number
  price_level?: string
  ranking: string
  address: string
  phone: string
  website?: string
  web_url?: string
  description?: string
  open_now_text?: string
  photo?: {
    caption?: string
    images?: {
      original: {
        url: string
      },
      thumbnail?: {
        url: string
      }
    }
  }
  price?: string
  hours?: {
    week_ranges: {
      open_time?: string
      close_time?: string
    }[]
  }
}

export type PlaceDetailsProps = {
  placeDetails: PlaceDetailsTypes[] | null
  className?: string,
  selectedPlace: number | null
}


export interface DropProps {
  filter: { label: string; value: string }[];
  content: string;
  setContent: (value: string) => void;
}
