import { FaStar, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const max = 5;

  return (
    <div className="flex gap-1 items-center justify-center mb-6">
      {[...Array(max)].map((_, index) => (
        <span className="text-[#f6b83d]" key={index}>
          {index < rating ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
      <p>{rating}</p>
    </div>
  );
};

export default StarRating;
