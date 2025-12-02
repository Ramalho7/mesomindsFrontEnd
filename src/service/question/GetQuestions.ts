import { ZodError } from "zod";
import api from "@/service/axios";
import { GetQuestionsResponseSchema } from "../../schemas/questionSchema/GetQuestionSchema";
import type { GetQuestionsResponseType } from "../../schemas/questionSchema/GetQuestionSchema";

export async function fetchQuestions(params?: {
    search?: string;
    status?: string;
    type?: "Multipla" | "VerdadeiroFalso" | "Aberta";
    materia?: string | number;
    page?: number;
}): Promise<GetQuestionsResponseType> {
    try {
        const response = await api.get("/api/questoes", {
            params,
            skipAuth: true,
        });
        console.log("Resposta da API:", response.data);

        const parsedResponse = GetQuestionsResponseSchema.parse(response.data);

        console.log("Questões validadas:", parsedResponse.data);
        return parsedResponse;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.error("Erro de validação no schema Zod:", error.issues);
            throw new Error("Erro de validação nos dados recebidos.");
        }

        console.error("Erro ao buscar questões:", error);
        throw new Error("Erro ao buscar questões. Verifique o console para mais detalhes.");
    }
}