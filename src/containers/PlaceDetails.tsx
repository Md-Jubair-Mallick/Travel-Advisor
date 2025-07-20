import Drop from '@/components/custom/Drop'
import Rating from '@/components/custom/Rating'
import { Button, Card } from '@/components/ui'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDropdown } from '@/stores/DropdownContext'
import type { PlaceDetailsProps } from '@/types'
import clsx from 'clsx'
import { Clock, Earth, MapPin, Phone } from 'lucide-react'
import { useEffect, useRef, type FC } from 'react'

const filterOptions  = [
    { label: 'Hotel', value: 'hotels' },
    { label: 'Restaurants', value: 'restaurants' },
    { label: 'Attractions', value: 'attractions' },
]
const filterRating = [
    { label: '1', value: "1" },
    { label: '2', value: "2" },
    { label: '3', value: "3" },
    { label: '4', value: "4" },
    { label: '5', value: "5" },
]

const PlaceDetails: FC<PlaceDetailsProps> = ({ placeDetails, className, selectedPlace }) => {
  const { type, setType, rating, setRating } = useDropdown();

    // Store refs for each place
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Scroll into view if a card is selected
  useEffect(() => {
    if (selectedPlace !== null && cardRefs.current[selectedPlace]) {
      cardRefs.current[selectedPlace]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedPlace]);


    return (
        <div className={clsx('flex-1', className)}>
            <div className="flex items-center justify-center gap-5 my-5">
                <Drop filter={filterOptions} content={type} setContent={setType}/>
                <Drop filter={filterRating} content={rating} setContent={setRating}/>
            </div>

            <ScrollArea className="h-[80vh] w-full rounded-md border p-4 mx-auto">
                {placeDetails?.map((place, index) => (
                    <Card key={index} className="w-full mx-auto my-5"  ref={(el) => { cardRefs.current[index] = el }}>
                        <CardHeader>
                            {!place?.photo?.images?.original?.url && (
                                <div className="relative w-full h-48 bg-gray-400" />)
                            }
                            {place?.photo?.images?.original?.url && (
                                <img src={place?.photo?.images?.original?.url} alt="Image" className="w-full h-auto object-contain" />
                            )}

                            <CardTitle className='my-5 text-3xl'>{place?.name}</CardTitle>
                            <CardDescription className='mb-5'>{place?.description}</CardDescription>

                            <div className="">
                                <Rating rating={place?.rating} reviews={place?.num_reviews} />
                            </div>
                            <div className="">
                                <Clock />
                                <p className='text-sm text-gray-500'>{place?.open_now_text}</p>
                            </div>
                            <div className="flex items-center justify-between gap-5">
                                <p className='text-sm text-gray-500'>Pricing</p>
                                <p className='text-sm text-gray-500'>{place?.price}</p>
                            </div>
                            <div className="flex items-center justify-between gap-5">
                                <p className='text-sm text-gray-500'>Ranking</p>

                                <p className='text-sm text-gray-500'>{place?.ranking}</p>
                            </div>
                        </CardHeader>
                        <div className="h-0.5 w-[90%] bg-gray-500 mx-auto" />
                        <CardContent className={clsx('flex flex-col gap-4')}>
                            <div className="flex items-center justify-between gap-5">
                                <MapPin className='' />
                                <p className='text-sm text-gray-500 flex-2'>{place?.address}</p>
                            </div>

                            <a href={place?.web_url} className="flex items-center justify-between gap-5">
                                <Earth />
                                <p className='text-sm text-gray-500'>
                                    visit website
                                </p>
                            </a>

                            <div className="flex items-center justify-between gap-5">
                                <Phone />
                                <p className='text-sm text-gray-500'>{place?.phone}</p>
                            </div>

                            <div className="flex gap-5 items-center justify-between">
                                <div className="flex items-center justify-center gap-2">
                                    <Clock />
                                    <p className='text-sm text-gray-500'>Opening Time</p>
                                </div>
                                <p className='text-sm text-gray-500'>{place?.hours?.week_ranges[0].open_time} 12</p>
                            </div>

                            <div className="flex gap-5 items-center justify-between">
                                <div className="flex items-center justify-center gap-2">
                                    <Clock />
                                    <p className='text-sm text-gray-500'>Close Time</p>
                                </div>
                                <p className='text-sm text-gray-500'>{place?.hours?.week_ranges[0].close_time}</p>
                            </div>

                        </CardContent>
                        <CardFooter className='flex flex-col gap-4'>

                            <Button variant="outline" className="w-full mt-5">
                                Booking
                            </Button>
                            <Button variant="outline" className="w-full mt-5">
                                View on Google Maps
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

            </ScrollArea>

        </div>
    )
}

export default PlaceDetails