export default function LoadingOrders() {
  return (
    <div className="min-h-screen bg-[#020b18] text-white p-4 md:p-6">
      <div className="h-6 w-32 bg-white/10 rounded mb-6 animate-pulse" />

      {/* Desktop Skeleton */}
      <div className="hidden md:block bg-[#0b2545] border border-white/10 rounded-lg overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-t border-white/10 animate-pulse"
          >
            <div className="h-4 w-40 bg-white/10 rounded" />
            <div className="h-4 w-56 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-4 w-12 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
          </div>
        ))}
      </div>

      {/* Mobile Skeleton */}
      <div className="md:hidden space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-[#0b2545] border border-white/10 rounded-lg p-4 space-y-3 animate-pulse"
          >
            <div className="h-4 w-3/4 bg-white/10 rounded" />
            <div className="h-3 w-full bg-white/10 rounded" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-3 bg-white/10 rounded" />
              <div className="h-3 bg-white/10 rounded" />
              <div className="h-3 bg-white/10 rounded" />
              <div className="h-3 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
