import api from "../axios";
import { ZodError } from "zod";
import { QuestionCollectionDataSchema, type QuestionCollectionData } from "../schemas/questionCollection/QuestionCollectionData";

export interface GetQuestionCollectionByIdResponse {
    success: boolean;
    data: QuestionCollectionData;
}

export async function GetQuestionCollectionByIdApi(id: number): Promise<QuestionCollectionData> {
    console.log(`Buscando coleção de questões com ID: ${id}`);

    try {
        const response = await api.get<GetQuestionCollectionByIdResponse>(
            `/api/questoescolecao/${id}`,
            {
                params: {
                    include: 'alternatives'
                }
            }
        );

        console.log("Resposta do servidor:", response.data);
        console.log("Dados da coleção:", response.data.data);
        console.log("Questões:", response.data.data.questions);
        if (response.data.data.questions && response.data.data.questions.length > 0) {
            console.log("Primeira questão:", response.data.data.questions[0]);
            console.log("Alternativas da primeira questão:", response.data.data.questions[0].alternatives);
        }
        
        const parsedData = QuestionCollectionDataSchema.parse(response.data.data);
        
        console.log("Dados parseados:", parsedData);
        console.log("Questões parseadas:", parsedData.questions);
        
        return parsedData;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.error("Erro de validação do zod:", error.issues);
            throw new Error("Erro ao validar dados da coleção de questões");
        }
        
        console.error("Erro na API:", error);
        
        if (error instanceof Error && error.message.includes("response")) {
            throw new Error("Coleção de questões não encontrada");
        }
        
        throw new Error("Erro ao buscar coleção de questões");
    }
}