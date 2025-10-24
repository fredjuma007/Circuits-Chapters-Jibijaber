interface PostCardSkeletonProps {
  theme: "tech" | "books"
}

export default function PostCardSkeleton({ theme }: PostCardSkeletonProps) {
  const themeColors = {
    tech: {
      border: "border-blue-500/20",
      shimmer: "bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-blue-500/10",
    },
    books: {
      border: "border-amber-500/20",
      shimmer: "bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10",
    },
  }

  const colors = themeColors[theme]

  return (
    <div
      className={`group h-full rounded-xl border ${colors.border} bg-background/40 backdrop-blur-sm overflow-hidden`}
    >
      {/* Featured Image Skeleton */}
      <div className={`h-48 ${colors.shimmer} animate-pulse`} />

      {/* Content Skeleton */}
      <div className="p-6 flex flex-col h-full space-y-4">
        {/* Badge Skeleton */}
        <div className={`h-6 w-20 rounded-full ${colors.shimmer} animate-pulse`} />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className={`h-5 w-full rounded ${colors.shimmer} animate-pulse`} />
          <div className={`h-5 w-3/4 rounded ${colors.shimmer} animate-pulse`} />
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 flex-grow">
          <div className={`h-4 w-full rounded ${colors.shimmer} animate-pulse`} />
          <div className={`h-4 w-5/6 rounded ${colors.shimmer} animate-pulse`} />
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className={`h-3 w-16 rounded ${colors.shimmer} animate-pulse`} />
          <div className={`h-3 w-20 rounded ${colors.shimmer} animate-pulse`} />
        </div>
      </div>
    </div>
  )
}
