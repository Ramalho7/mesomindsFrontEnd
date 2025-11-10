import { fetchContents } from "@/service/content/getContent";
import { useQuery } from "@tanstack/react-query";

export function useGetContent(
  params?: {
    search?: string;
    status?: string;
    content_type?: string;
    content_tag?: string;
    page?: number;
  },
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["content", params],
    queryFn: () => fetchContents(params),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}
