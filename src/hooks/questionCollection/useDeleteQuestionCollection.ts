import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestionCollection } from "@/service/questionCollection/DeleteQuestionCollection";
import type { DeleteQuestionCollectionResponse } from "@/schemas/questionCollection/DeleteQuestionCollectionSchema";

export function useDeleteQuestionCollection() {
    const queryClient = useQueryClient();

    return useMutation<DeleteQuestionCollectionResponse, Error, number>({
        mutationFn: (id: number) => deleteQuestionCollection(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questionsCollections"] });
            queryClient.invalidateQueries({ queryKey: ["questionCollection"] });
        },
    });
}
