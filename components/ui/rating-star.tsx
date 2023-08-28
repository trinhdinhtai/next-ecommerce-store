import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const maxRating = 5;
  const filledStars = Math.floor(rating);
  const emptyStars = maxRating - filledStars;

  const starElements = [];
  for (let i = 0; i < filledStars; i++) {
    starElements.push(<FaStar key={i} className="text-[#FF9529]" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    starElements.push(
      <FaRegStar key={filledStars + i} className="empty-star" />
    );
  }

  return <div className="flex item-centers gap-0.5">{starElements}</div>;
};

export default StarRating;
