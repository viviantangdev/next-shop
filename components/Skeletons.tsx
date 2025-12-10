export function NavbarCategoriesSkeleton() {
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
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 py-8 px-5 w-full md:w-auto'>
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className='product-card w-full md:w-[350px] h-135 flex flex-col'>
      <div className='h-full w-full overflow-hidden  bg-gray-200 animate-pulse' />
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

export function NavbarIconsSkeleton({count}: {count:number}) {
  return (
    <div className="flex gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <IconSkeleton key={i} />
      ))}
    </div>
  );
}

 function IconSkeleton() {
  return <div className='h-8 w-8 rounded bg-gray-200 animate-pulse' />;
}
