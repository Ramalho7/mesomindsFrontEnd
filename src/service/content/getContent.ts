import { ZodError } from "zod";
import api from "@/service/axios";
import { apiResponseSchema } from "../schemas/contentSchema/GetContentsSchema";
import type { ContentPayloadResponse } from "@/Interface/content/ContentPayloadResponse";

export async function fetchContents(params?: {
  search?: string;
  status?: string;
  content_type?: string;
  content_tag?: string;
  page?: number;
}): Promise<ContentPayloadResponse> {
  try {
    const response = await api.get("/api/conteudos", {
      params,
      skipAuth: true,
    });
    console.log("Resposta da API:", response.data);

    const parsedResponse = apiResponseSchema.parse(response.data);

    console.log("Conteúdo validado:", parsedResponse.data);
    return parsedResponse.data;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error("erro de validação do zod:", error.issues);
      throw new Error("Não foi possível carregar os conteúdos: erro de validação");
    }
    console.error("Erro ao buscar conteúdos:", error);
    throw new Error("Não foi possível carregar os conteúdos");
  }
}