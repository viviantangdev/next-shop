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

export function ProductsWrapperSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 md:px-8 lg:px-12'>
      {Array.from({ length: 4 }).map((_, i) => (
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
