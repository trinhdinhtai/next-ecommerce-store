"use client"

import { FaRegStar, FaStar } from "react-icons/fa"

interface StarRatingProps {
  rating: number
}

const StarRating = ({ rating }: StarRatingProps) => {
  const renderStars = () => {
    const maxRating = 5
    const filledStars = Math.floor(rating)
    const emptyStars = maxRating - filledStars
    const starElements = []
    for (let i = 0; i < filledStars; i++) {
      starElements.push(<FaStar key={i} className="text-[#FF9529]" />)
    }
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <FaRegStar key={filledStars + i} className="empty-star" />
      )
    }
    return starElements
  }

  if (!rating) return null

  return <div className="flex gap-0.5">{renderStars()}</div>
}

export default StarRating
