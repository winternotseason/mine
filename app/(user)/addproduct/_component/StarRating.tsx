import React from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
  const handleClick = (index: number) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
