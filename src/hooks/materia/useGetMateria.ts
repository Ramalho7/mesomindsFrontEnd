import { fetchMaterias } from "@/service/materias/GetMaterias";
import { useQuery } from "@tanstack/react-query";

export function useGetMaterias() {
    return useQuery({
        queryKey: ["materias"],
        queryFn: () => fetchMaterias(),
        staleTime: 1000 * 60 * 5,
    });
}