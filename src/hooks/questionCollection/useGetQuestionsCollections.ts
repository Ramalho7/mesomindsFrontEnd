import { useQuery } from "@tanstack/react-query";
import { fetchQuestionsCollections } from "@/service/questionCollection/GetQuestionsCollections";
import type { QuestionCollectionResponseType } from "@/service/schemas/questionCollection/QuestionCollectionResponse";

interface UseGetQuestionsCollectionsParams {
    search?: string;
    status?: string;
    type?: string;
    page?: number;
    per_page?: number;
    enabled?: boolean;
}

export function useGetQuestionsCollections(
    params?: UseGetQuestionsCollectionsParams
) {
    const {
        search,
        status,
        type,
        page = 1,
        per_page = 10,
        enabled = true,
    } = params || {};

    return useQuery<QuestionCollectionResponseType, Error>({
        queryKey: ["questionsCollections", { search, status, type, page, per_page }],
        queryFn: () =>
            fetchQuestionsCollections({
                search,
                status,
                type,
                page,
                per_page,
            }),
        enabled,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
}