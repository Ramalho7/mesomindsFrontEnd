import { fetchContentTags } from "@/service/content/contentTag/getContentTag";
import { useQuery } from "@tanstack/react-query";

export function useContentTags() {
  return useQuery({
    queryKey: ["contentTags"],
    queryFn: fetchContentTags,
    staleTime: 1000 * 60 * 5,
  });
}
