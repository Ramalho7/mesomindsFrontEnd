import { createContentApi } from "@/service/content/postContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContentApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      console.log("Conteúdo criado com sucesso:", data);
    },
    onError: (error) => {
      console.error("Erro ao criar conteúdo:", error);
    },
  });
}
