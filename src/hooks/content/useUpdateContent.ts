import { EditContentApi } from "@/service/content/editContent";
import type { EditContentPayload } from "@/service/schemas/contentSchema/EditContentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditContentPayload) => EditContentApi(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      queryClient.invalidateQueries({ queryKey: ["content", variables.id] });
    },
  });
}
