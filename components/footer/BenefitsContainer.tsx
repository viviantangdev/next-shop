import { BenefitItems } from '@/lib/benefits';

export default function BenefitsContainer() {
  return (
    <>
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 '>
          {BenefitItems.map((benefit, i) => (
            <div key={i} className='flex flex-col items-center text-center'>
              <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                {benefit.icon}
              </div>
              <h4 className='font-semibold text-gray-900 mb-1'>
                {benefit.title}
              </h4>
              <p className='text-sm text-gray-600'> {benefit.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
