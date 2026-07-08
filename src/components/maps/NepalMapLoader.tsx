"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const NepalMap = dynamic(() => import("./NepalMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-[480px] w-full rounded-xl" />,
});

export { NepalMap };
