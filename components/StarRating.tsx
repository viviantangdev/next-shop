import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;        // e.g. 4.3
  maxStars?: number;     // default 5
  size?: number;         // icon size in pixels, default 20
  className?: string;
};

export default function StarRating({
  rating,
  maxStars = 5,
  size = 20,
  className = "",
}: StarRatingProps) {
  // Clamp rating between 0 and maxStars
  const safeRating = Math.max(0, Math.min(maxStars, rating));

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const fillPercentage = Math.min(
          100,
          Math.max(0, (safeRating - i) * 100)
        );

        return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            {/* Empty star (background) */}
            <Star
              size={size}
              className="text-gray-300"
              fill="currentColor"
            />

            {/* Filled star (overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                size={size}
                className="text-yellow-400"
                fill="currentColor"
              />
            </div>
          </div>
        );
      })}
      {/* Optional: show the numeric rating next to stars */}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}