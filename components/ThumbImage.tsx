import Image from 'next/image';

interface ThumbProps {
  image: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Thumb({
  image,
  isActive = false,
  onClick,
}: ThumbProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={`rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg overflow-hidden ${
        isActive ? 'ring-2 ring-amber-500/50' : ''
      }`}
    >
      <Image
        src={image}
        alt={image}
        width={50}
        height={50}
        priority
        className={`rounded-lg shadow-sm hover:shadow-lg cursor-pointer`}
      />
    </button>
  );
}
