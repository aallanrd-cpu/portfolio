export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Header Skeleton */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
              <div className="h-4 w-24 bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-16 bg-gray-600 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs Skeleton */}
      <div className="border-b border-white/5 bg-slate-900/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-12 bg-gray-600 rounded animate-pulse" />
              <span className="text-gray-500">/</span>
              <div className="h-3 w-16 bg-gray-600 rounded animate-pulse" />
              <span className="text-gray-500">/</span>
              <div className="h-3 w-32 bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section Skeleton */}
        <div className="mb-12 text-center">
          <div className="h-8 w-32 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-16 w-3/4 bg-gradient-to-r from-gray-600 to-gray-700 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-1/2 bg-gray-600 rounded mx-auto mb-6 animate-pulse" />
          <div className="flex justify-center gap-3 mb-6">
            <div className="h-6 w-20 bg-gray-600 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full animate-pulse" />
          </div>
          <div className="h-24 w-full max-w-3xl bg-gray-600 rounded mx-auto mb-8 animate-pulse" />
          
          {/* Action Buttons Skeleton */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="h-12 w-32 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl animate-pulse" />
            <div className="h-12 w-28 bg-purple-500/20 border border-purple-500/30 rounded-xl animate-pulse" />
            <div className="h-12 w-28 bg-gray-500/20 border border-gray-500/30 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-6 w-6 bg-gray-600 rounded animate-pulse" />
                <div className="h-8 w-48 bg-gray-600 rounded animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-600 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-600 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-600 rounded animate-pulse" />
              </div>
            </div>

            {/* Achievements Section */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-6 w-6 bg-gray-600 rounded animate-pulse" />
                <div className="h-8 w-40 bg-gray-600 rounded animate-pulse" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="h-2 w-2 bg-cyan-400 rounded-full mt-2 animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-600 rounded animate-pulse mb-2" />
                      <div className="h-4 w-3/4 bg-gray-600 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs Section */}
            <div className="space-y-8">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-6 bg-gray-600 rounded animate-pulse" />
                  <div className="h-6 w-32 bg-gray-600 rounded animate-pulse" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/5">
                      <div className="h-3 w-16 bg-gray-600 rounded animate-pulse mb-2" />
                      <div className="h-5 w-20 bg-cyan-300/30 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="h-5 w-24 bg-gray-600 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-3 w-16 bg-gray-600 rounded animate-pulse mb-1" />
                    <div className="h-4 w-24 bg-white rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="h-5 w-32 bg-gray-600 rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-7 w-16 bg-cyan-500/20 border border-cyan-500/30 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}