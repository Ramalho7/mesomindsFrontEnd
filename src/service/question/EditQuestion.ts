import api from "../axios";
import { ResponseQuestionResponseSchema, type QuestionResponseType } from "../../schemas/questionSchema/ResponseQuestionSchema";
import { UpdateQuestionSchema, type EditQuestionPayload } from "../../schemas/questionSchema/UpdateQuestionSchema";

export async function EditQuestionApi(
    payload: EditQuestionPayload,
): Promise<QuestionResponseType> {
    const validatedPayload = UpdateQuestionSchema.parse(payload);

    const { id, ...data } = validatedPayload;

    const requestBody = {
        title: data.title,
        content: data.content,
        correction: data.correction,
        materia: data.materia,
        type: data.type,
        alternatives: data.alternatives,
    };

    console.log("Payload enviado para o back-end:", requestBody);

    try {
        const response = await api.put<QuestionResponseType>(
            `api/questoes/${id}`,
            requestBody,
        );

        console.log("Resposta do servidor:", response.data);
        return ResponseQuestionResponseSchema.parse(response.data);
    } catch (error: any) {
        console.error("Erro na API:", error.response?.data || error.message);
        if (error.response) {
            throw new Error(
                error.response.data.message || "Erro ao atualizar questão",
            );
        }
        throw new Error("Erro ao atualizar questão");
    }
}