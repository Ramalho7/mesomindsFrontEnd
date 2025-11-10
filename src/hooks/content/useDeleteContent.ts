import {
  DeleteContentApi,
  type DeleteContentPayload,
} from "@/service/content/deleteContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteContentPayload) => DeleteContentApi(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      queryClient.invalidateQueries({ queryKey: ["content", variables.id] });
    },
  });
}
