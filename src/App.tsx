import { useEffect, useState, type FC } from "react"
import { Header } from "./containers";
import PlaceDetails from "./containers/PlaceDetails";
import Map from "./containers/Map";
import { PlaceDetails as PlaceDetailsAPI } from "./api";
import type { Bounds, Coordinates, PlaceDetailsTypes } from "./types";
import { useDropdown } from "./stores/DropdownContext";

const App: FC = () => {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetailsTypes[] | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState<Bounds | undefined>();
  const { type, rating } = useDropdown();
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    // Request the user's location
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );

  }, []);

  useEffect(() => {
    const isValidCoordinates = coordinates.lat !== 0 && coordinates.lng !== 0;
    const isValidBounds = bounds?.ne && bounds?.sw;
    const isValidBoundsCoordinates =
      bounds?.ne.lat !== 0 &&
      bounds?.ne.lng !== 0 &&
      bounds?.sw.lat !== 0 &&
      bounds?.sw.lng !== 0;
    const isValidBoundsObject = isValidBounds && isValidBoundsCoordinates;

    if (!isValidCoordinates) {
      console.error("Invalid coordinates:", coordinates);
      return;
    }
    if (!isValidBoundsObject) {
      console.error("Invalid bounds:", bounds);
      return;
    }
    // Fetch place details only if coordinates and bounds are valid
    if (isValidCoordinates && bounds) {
      PlaceDetailsAPI({ coordinates, bounds, type, rating })
        .then(
          (data) => setPlaceDetails(data?.data)
        )
        .catch((error) => console.error("Error fetching place details:", error));
    }
 
  }, [coordinates, bounds, type, rating]);


  return (
    <div className="">
      <Header  setCoordinates={setCoordinates}/>
      <main className="lg:flex lg:gap-4 flex-col lg:flex-row h-[calc(100vh-64px)] lg:m-4 my-4">
        <Map
        className="flex-2"
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          placeDetails={placeDetails}
          setSelectedPlace={setSelectedPlace}
        />

        <PlaceDetails placeDetails={placeDetails} className="flex-1 max-md:absolute z-10 top-[90vh]" selectedPlace={selectedPlace}/>

      </main>
    </div>
  );
}

export default App
