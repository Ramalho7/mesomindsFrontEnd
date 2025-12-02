import { ZodError } from "zod";
import api from "@/service/axios";
import { getMateriaSchema, type GetMateriaResponseType } from "../../schemas/materia/GetMateriaSchema";

export async function fetchMaterias(): Promise<GetMateriaResponseType> {
    try {
        const initialResponse = await api.get("api/materias", {
            params: { page: 1, per_page: 100 },
        });

        const validatedResponse = getMateriaSchema.parse(initialResponse.data);

        const totalItems = validatedResponse.data.total;
        const perPage = validatedResponse.data.per_page;
        const totalPages = Math.ceil(totalItems / perPage);

        let allData = [...validatedResponse.data.data];

        for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
            const response = await api.get("api/materias", {
                params: { page: currentPage, per_page: perPage },
            });

            const pageResponse = getMateriaSchema.parse(response.data);

            if (pageResponse.data.data) {
                allData = [...allData, ...pageResponse.data.data];
            }
        }

        return {
            ...validatedResponse,
            data: {
                ...validatedResponse.data,
                data: allData,
                total: allData.length,
            },
        };
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Erro de validação no schema Zod:", error.issues);
            throw new Error("Erro de validação nos dados recebidos.");
        }

        console.error("Erro ao buscar matérias:", error);
        throw new Error("Erro ao buscar matérias. Verifique o console para mais detalhes.");
    }
}