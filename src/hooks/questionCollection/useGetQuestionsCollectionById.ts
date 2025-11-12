import { useQuery } from "@tanstack/react-query";
import { GetQuestionCollectionByIdApi } from "@/service/questionCollection/GetQuestionCollectionById";
import type { QuestionCollectionData } from "@/service/schemas/questionCollection/QuestionCollectionData";

export function useGetQuestionCollectionById(id: number) {
    return useQuery<QuestionCollectionData, Error>({
        queryKey: ["questionCollection", id],
        queryFn: () => GetQuestionCollectionByIdApi(id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
}