import { fetchContent } from "@/service/content/getContentById";
import { useQuery } from "@tanstack/react-query";

export function useGetContentById(id: number) {
  return useQuery({
    queryKey: ["content", id],
    queryFn: () => fetchContent(id),
    staleTime: 1000 * 60 * 5,
  });
}
