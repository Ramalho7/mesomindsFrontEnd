import { ZodError } from "zod";
import api from "@/service/axios";
import { QuestionCollectionResponseSchema } from "../../schemas/questionCollection/QuestionCollectionResponse";
import type { QuestionCollectionResponseType } from "../../schemas/questionCollection/QuestionCollectionResponse";

interface FetchQuestionsCollectionsParams {
    search?: string;
    status?: string;
    type?: string;
    page?: number;
    per_page?: number;
}

export async function fetchQuestionsCollections(
    params?: FetchQuestionsCollectionsParams
): Promise<QuestionCollectionResponseType> {
    try {
        const response = await api.get("/api/questoescolecao", {
            params,
            skipAuth: true,
        });

        console.log("Resposta da API:", response.data);

        const parsedResponse = QuestionCollectionResponseSchema.parse(response.data);

        console.log("Coleções validadas:", parsedResponse.data);
        return parsedResponse;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.error("Erro de validação do zod:", error.issues);
            throw new Error(
                "Não foi possível carregar as coleções de questões: erro de validação"
            );
        }
        console.error("Erro ao buscar coleções de questões:", error);
        throw new Error("Não foi possível carregar as coleções de questões");
    }
}