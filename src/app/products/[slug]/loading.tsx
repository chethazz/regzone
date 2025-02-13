import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="px-5 py-10 mx-auto space-y-10 max-w-7xl">
            <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
                <div className="basis-2/5">
                    <Skeleton className="w-full aspect-square" />
                </div>
                <div className="space-y-5 basis-3/5">
                    <Skeleton className="w-56 h-14" />
                    <Skeleton className="w-full h-56" />
                    <Skeleton className="w-56 h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
            </div>
        </main>
    );
}