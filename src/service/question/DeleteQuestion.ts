import api from "../axios";
import { DeleteQuestionResponseSchema, type DeleteQuestionPayload, type DeleteQuestionResponse } from "../../schemas/questionSchema/DeleteQuestionSchema";

export async function DeleteQuestionApi(
    payload: DeleteQuestionPayload,
): Promise<DeleteQuestionResponse> {
    const { id } = payload;

    console.log("Deletando questão com ID:", id);

    try {
        const response = await api.delete<DeleteQuestionResponse>(
            `/api/questoes/${id}`,
        );

        console.log("Resposta do servidor:", response.data);
        return DeleteQuestionResponseSchema.parse(response.data);
    } catch (error: any) {
        console.error("Erro na API:", error.response?.data || error.message);
        if (error.response) {
            throw new Error(
                error.response.data.message || "Erro ao deletar questão",
            );
        }
        throw new Error("Erro ao deletar questão");
    }
}