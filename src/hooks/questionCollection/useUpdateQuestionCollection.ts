import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestionCollection, type UpdateQuestionCollectionResponse } from "@/service/questionCollection/UpdateQuestionCollection";
import type { UpdateQuestionCollectionType } from "@/schemas/questionCollection/UpdateQuestionCollectionSchema";

interface UpdateQuestionCollectionParams {
    id: number;
    data: UpdateQuestionCollectionType;
}

export function useUpdateQuestionCollection() {
    const queryClient = useQueryClient();

    return useMutation<UpdateQuestionCollectionResponse, Error, UpdateQuestionCollectionParams>({
        mutationFn: ({ id, data }) => updateQuestionCollection(id, data),
        onSuccess: (_, variables) => {
            // Invalida as queries de coleções para atualizar a lista e o detalhe
            queryClient.invalidateQueries({ queryKey: ["questionsCollections"] });
            queryClient.invalidateQueries({ queryKey: ["questionCollection", variables.id] });
        },
    });
}
