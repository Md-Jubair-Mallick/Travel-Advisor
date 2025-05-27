import Rating from "@/components/custom/Rating";
import { Button, Card } from "@/components/ui";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MapProps } from "@/types";
import { GoogleMap, Marker, OverlayView, useLoadScript } from "@react-google-maps/api";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { useMediaQuery } from "react-responsive";


const containerStyle = {
  width: "100%",
  height: "70vh",
};

const Map: FC<MapProps> = ({ coordinates, setCoordinates, setBounds, className, placeDetails, setSelectedPlace }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const [toggle, setToggle] = useState(false)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    const listener = map.addListener("idle", () => {
      const bounds = map.getBounds();
      const center = map.getCenter();
      if (!bounds || !center) return;

      setCoordinates({
        lat: center.lat(),
        lng: center.lng(),
      });

      setBounds({
        ne: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng(),
        },
        sw: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng(),
        },
      });

      // Remove the listener so it only runs once
      google.maps.event.removeListener(listener);
    });
  }, [setBounds, setCoordinates]);

  const onDragEnd = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const bounds = mapRef.current.getBounds();

      setCoordinates({
        lat: center?.lat() || 0,
        lng: center?.lng() || 0,
      });

      setBounds(
        {
          ne: {
            lat: bounds?.getNorthEast().lat() || 0,
            lng: bounds?.getNorthEast().lng() || 0,
          },
          sw: {
            lat: bounds?.getSouthWest().lat() || 0,
            lng: bounds?.getSouthWest().lng() || 0,
          },
        }
      );
    }
  }, [setBounds, setCoordinates]);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      setBounds(
        {
          ne: {
            lat: bounds?.getNorthEast().lat() || 0,
            lng: bounds?.getNorthEast().lng() || 0,
          },
          sw: {
            lat: bounds?.getSouthWest().lat() || 0,
            lng: bounds?.getSouthWest().lng() || 0,
          },
        }
      );
      }
      }, [coordinates]);


  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className={clsx(className, "relative")}>
      {isDesktop && (
        <div className="flex gap-10">
        <h1 className="text-2xl font-bold mb-4">Map</h1>
      <Button onClick={() => setToggle(!toggle)} className="mb-4">
        {toggle ? "Hide Place Cards" : "Show Place Cards"}
        <span className="ml-2">{toggle ? "🔽" : "🔼"}</span>
      </Button>
        </div>
      )}
      <GoogleMap
        center={coordinates}
        zoom={14}
        mapContainerStyle={containerStyle}
        onLoad={onMapLoad}
        onDragEnd={onDragEnd}
        onZoomChanged={onDragEnd}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        }}
      >
        {placeDetails?.map((place, index) => (
          <>
            {(isDesktop && toggle) && (
              <OverlayView
                key={index}
                position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <Card className="relative w-[200px] max-w-[90vw] shadow-lg border border-gray-200 rounded-xl bg-white transition-transform transform hover:scale-105 hover:z-20"
                onClick={() => setSelectedPlace(index)}
                >
                  <CardHeader className="">
                    <CardTitle className="text-base font-medium text-gray-800">
                      {place?.name}
                    </CardTitle>
                    <Rating rating={place?.rating} />
                  </CardHeader>
                  <CardContent className="p-0">
                    <img
                      src={place?.photo?.images?.original?.url || "https://via.placeholder.com/220x150?text=No+Image"}
                      alt={place?.photo?.caption || place?.name}
                      className="rounded-b-xl object-cover w-full h-[120px]"
                      loading="lazy"
                      decoding="async"
                    />
                  </CardContent>
                </Card>
              </OverlayView>

            )}
            {(!isDesktop || !toggle) && (
              <Marker
                key={index}
                position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                title={place.name}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new google.maps.Size(30, 30),
                }}
              />
            )}
          </>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
