import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionCollection } from "@/service/questionCollection/PostQuestionCollection";
import type { PostQuestionCollectionType } from "@/service/schemas/questionCollection/PostQuestionCollection";

export function useCreateQuestionCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PostQuestionCollectionType) => createQuestionCollection(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questionsCollections"] });
        },
    });
}