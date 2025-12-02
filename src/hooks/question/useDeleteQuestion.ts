
import { DeleteQuestionApi } from "@/service/question/DeleteQuestion";
import type { DeleteQuestionPayload } from "@/schemas/questionSchema/DeleteQuestionSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: DeleteQuestionPayload) => DeleteQuestionApi(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            queryClient.invalidateQueries({ queryKey: ["question", variables.id] });
        },
    });
}