
import { EditQuestionApi } from "@/service/question/EditQuestion";
import type { EditQuestionPayload } from "@/schemas/questionSchema/UpdateQuestionSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: EditQuestionPayload) => EditQuestionApi(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            queryClient.invalidateQueries({ queryKey: ["questions", variables.id] });
        },
    });
}