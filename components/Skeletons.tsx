export function NavMenuSkeleton() {
  return (
    <div className='flex gap-3'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='h-8 w-20 rounded-full bg-gray-200 animate-pulse'
        />
      ))}
    </div>
  );
}

export function ProductsContainerSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 md:px-8 lg:px-12'>
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className='product-card'>
      <div className='h-54 w-full overflow-hidden  bg-gray-200 animate-pulse' />
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className='flex flex-col items-center gap-12 lg:gap-7 lg:flex-row w-full'>
      {/* Image section */}
      <section className='flex flex-col items-center gap-3 w-full'>
        <div className='w-full h-105 bg-gray-200 animate-pulse rounded-2xl' />
        <div className='flex gap-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='h-12 w-12 bg-gray-200 animate-pulse rounded-lg'
            />
          ))}
        </div>
      </section>
      <div className='w-full'>
        {/* Details */}
        <section className='flex flex-col gap-2'>
          <div className='h-5 w-50 rounded-full bg-gray-200 animate-pulse' />
          <div className='h-5 w-50 rounded-full bg-gray-200 animate-pulse' />
          <div className='h-5 w-50 rounded-full bg-gray-200 animate-pulse' />
          <div className='h-5 w-50 rounded-full bg-gray-200 animate-pulse' />
        </section>
        {/* Action buttons */}
        <section className='flex flex-col gap-3 my-4 md:flex-row'>
          <div className='h-8 w-20 rounded-full bg-gray-200 animate-pulse' />
          <div className='h-8 w-20 rounded-full bg-gray-200 animate-pulse' />
        </section>
      </div>
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <section className='flex flex-col gap-5'>
      <div className='h-5 w-50 rounded-full bg-gray-200 animate-pulse' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='w-full h-30 bg-gray-200 animate-pulse rounded-lg'
          ></div>
        ))}
      </div>
    </section>
  );
}
