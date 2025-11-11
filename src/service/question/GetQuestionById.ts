import api from "../axios";
import { ResponseQuestionResponseSchema, type QuestionResponseType } from "../schemas/questionSchema/ResponseQuestionSchema";

export async function GetQuestionByIdApi(id: number): Promise<QuestionResponseType> {
    console.log(`Buscando questão com ID: ${id}`);

    try {
        const response = await api.get<QuestionResponseType>(`/api/questoes/${id}`);

        console.log("Resposta do servidor:", response.data);
        return ResponseQuestionResponseSchema.parse(response.data);
    } catch (error: any) {
        console.error("Erro na API:", error.response?.data || error.message);
        if (error.response) {
            throw new Error(
                error.response.data.message || "Erro ao buscar questão",
            );
        }
        throw new Error("Erro ao buscar questão");
    }
}