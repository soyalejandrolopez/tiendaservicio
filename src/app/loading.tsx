export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black/50 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="h-16 bg-slate-700 animate-pulse rounded-lg"></div>
              <div className="h-8 bg-slate-700 animate-pulse rounded-lg w-3/4"></div>
              <div className="h-12 bg-slate-700 animate-pulse rounded-lg w-1/2 mt-6"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-lg h-64 bg-slate-700 animate-pulse rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="h-12 bg-slate-800 animate-pulse rounded-lg max-w-md mx-auto"></div>
            <div className="h-6 bg-slate-800 animate-pulse rounded-lg max-w-2xl mx-auto"></div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden">
                <div className="aspect-video bg-slate-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-slate-200 animate-pulse rounded w-3/4"></div>
                  <div className="h-10 bg-slate-200 animate-pulse rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
