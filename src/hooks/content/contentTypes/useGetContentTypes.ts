import { fetchContentTypes } from "@/service/content/contentType/getContentType";
import { useQuery } from "@tanstack/react-query";

export function useContentTypes() {
  return useQuery({
    queryKey: ["contentTypes"],
    queryFn: fetchContentTypes,
    staleTime: 1000 * 60 * 5,
  });
}
