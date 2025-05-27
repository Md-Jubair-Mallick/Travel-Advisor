import { Star, StarHalf, StarOff } from 'lucide-react'

type RatingProps = {
  rating: number | string | undefined
  reviews?: number
  size?: number
}

const Rating = ({ rating, reviews, size = 14 }: RatingProps) => {
  const numericRating = typeof rating === 'number' ? rating : Number(rating)

  if (isNaN(numericRating)) return null // Safely handle invalid ratings

  const fullStars = Math.floor(numericRating)
  const hasHalfStar = numericRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      <span className="font-medium text-sm">{numericRating.toFixed(1)}</span>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} fill="orange" stroke="none" size={size} />
        ))}
        {hasHalfStar && <StarHalf fill="orange" stroke="none" size={size} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOff key={`empty-${i}`} fill="gray" stroke="none" size={size} />
        ))}
      </span>
      {reviews !== undefined && (
        <span className="text-sm text-gray-500 ml-2">({reviews})</span>
      )}
    </div>
  )
}

export default Rating
