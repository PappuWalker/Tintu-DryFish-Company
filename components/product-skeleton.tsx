import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <Skeleton className="h-40 w-full rounded-t-lg" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      <div className="px-4 pb-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
