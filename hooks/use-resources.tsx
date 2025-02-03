"use client";

import { CloudinaryResource } from "@/types/cloudinary.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UseResources {
  initialResources?: Array<CloudinaryResource>;
  disableFetch?: boolean;
  tag?: string;
}

export function useResources(options?: UseResources) {
  const queryClient = useQueryClient();
  const { disableFetch = false } = options || {};

  const { data: resources } = useQuery({
    queryKey: ["resources", options?.tag],
    queryFn: async () => {
      const { data } = await fetch("/api/resources").then((res) => res.json());
      return data;
    },
    initialData: options?.initialResources,
    enabled: !disableFetch,
  });

  const addResources = (results: Array<CloudinaryResource>) => {
    queryClient.setQueryData(
      ["resources", String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],
      (old: Array<CloudinaryResource>) => {
        return [...results, ...old];
      },
    );
    queryClient.invalidateQueries({
      queryKey: [
        "resources",
        String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG),
      ],
    });
    console.log("addResources results", results);
  };

  return {
    addResources,
    resources,
  };
}
