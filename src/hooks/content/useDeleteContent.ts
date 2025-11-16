import {
  DeleteContentApi,
} from "@/service/content/deleteContent";
import type { DeleteContentPayload } from "@/service/schemas/contentSchema/DeleteContentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteContentPayload) => DeleteContentApi(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      queryClient.invalidateQueries({ queryKey: ["content", variables.id] });
    },
  });
}
