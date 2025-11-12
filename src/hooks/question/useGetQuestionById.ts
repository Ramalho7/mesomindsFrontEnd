import { GetQuestionByIdApi } from "@/service/question/GetQuestionById";
import { useQuery } from "@tanstack/react-query";

export function useGetQuestionById(id: number) {
    return useQuery({
        queryKey: ["question", id],
        queryFn: () => GetQuestionByIdApi(id),
        staleTime: 1000 * 60 * 5,
    });
}
