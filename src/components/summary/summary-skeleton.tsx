import { Skeleton } from "~components/ui/skeleton"

const SummarySkeleton = () => {
  return (
    <div className="h-[600px] w-full px-3">
      <div className="w-full rounded-lg space-y-4">
        <div className="flex flex-col space-y-5">
          {Array.from({ length: 16 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SummarySkeleton
