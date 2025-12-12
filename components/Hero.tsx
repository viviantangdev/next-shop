interface HeroProps {
  title: string;
}
export default function Hero({ title }: HeroProps) {
  return (
    <header className='p-20 bg-amber-500 text-center'>
      <h2 className='uppercase text-white text-3xl font-bold'>
        {title}
      </h2>
    </header>
  );
}
