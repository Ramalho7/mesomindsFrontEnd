
import { EditQuestionApi } from "@/service/question/EditQuestion";
import type { EditQuestionPayload } from "@/service/schemas/questionSchema/UpdateQuestionSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: EditQuestionPayload) => EditQuestionApi(payload),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            queryClient.invalidateQueries({ queryKey: ["questions", variables.id] });
        },
    });
}