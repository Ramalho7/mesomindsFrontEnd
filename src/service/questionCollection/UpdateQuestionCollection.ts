import api from "@/service/axios";
import type { UpdateQuestionCollectionType } from "../schemas/questionCollection/UpdateQuestionCollectionSchema";
import type { QuestionCollectionData } from "../schemas/questionCollection/QuestionCollectionData";

export interface UpdateQuestionCollectionResponse {
    success: boolean;
    message: string;
    data: QuestionCollectionData;
}

export async function updateQuestionCollection(
    id: number,
    data: UpdateQuestionCollectionType
): Promise<UpdateQuestionCollectionResponse> {
    const response = await api.put<UpdateQuestionCollectionResponse>(
        `/api/questoescolecao/${id}`,
        data
    );
    return response.data;
}
