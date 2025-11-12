import { fetchQuestions } from "@/service/question/GetQuestions";
import { useQuery } from "@tanstack/react-query";

export function useGetQuestions(
    params?: {
        search?: string;
        status?: string;
        type?: "Multipla" | "VerdadeiroFalso" | "Aberta";
        materia?: string;
        page?: number;
    },
    enabled: boolean = true,
) {
    return useQuery({
        queryKey: ["questions", params],
        queryFn: () => fetchQuestions(params),
        staleTime: 1000 * 60 * 5,
        enabled,
    });
}