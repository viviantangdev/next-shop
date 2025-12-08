interface HeroProps {
  title: string;
}
export default function Hero({ title }: HeroProps) {
  return (
    <header className='p-20 bg-amber-500'>
      <h3 className='uppercase font-bold text-white text-3xl text-center'>
        {title}
      </h3>
    </header>
  );
}
