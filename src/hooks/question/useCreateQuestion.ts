import { postQuestion } from "@/service/question/PostQuestion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateQuestionOptions = {
    onSuccess?: () => void;
    onError?: (error: any) => void;
};

export function useCreateQuestion(options?: UseCreateQuestionOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postQuestion,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            console.log("Questão criada com sucesso:", data);
            options?.onSuccess?.();
        },
        onError: (error) => {
            console.error("Erro ao criar questão:", error);
            options?.onError?.(error);
        },
    })
}