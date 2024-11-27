"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ContributionHeatmap({ username }: { username: string }) {
  return (
    <Card className="p-4">
      <iframe
        src={`https://ghchart.rshah.org/${username}`}
        width="100%"
        height="100"
        frameBorder="0"
        className="w-full"
      />
    </Card>
  );
}

export function ContributionHeatmapSkeleton() {
  return (
    <Card className="p-4">
      <Skeleton className="w-full h-[100px]" />
    </Card>
  );
}
