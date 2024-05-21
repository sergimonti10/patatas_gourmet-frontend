const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ProductCardSkeleton() {
  return (
    <div className="flex justify-center items-center h-40 w-40 rounded-full bg-gray-200 animate-pulse">
      <div className="h-16 w-16 rounded-full bg-gray-300"></div>
    </div>
  );
}




