export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container py-8 md:py-16 px-4">
        <div className="mb-8 md:mb-16 text-center space-y-2 md:space-y-4">
          <div className="h-12 bg-slate-800 animate-pulse rounded-lg max-w-md mx-auto"></div>
          <div className="h-6 bg-slate-800 animate-pulse rounded-lg max-w-2xl mx-auto"></div>
        </div>

        <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden border border-slate-200">
              <div className="aspect-video bg-slate-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 bg-slate-200 animate-pulse rounded w-3/4"></div>
                <div className="h-10 bg-slate-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
