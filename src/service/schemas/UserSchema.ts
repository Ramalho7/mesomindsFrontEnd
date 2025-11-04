import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string(),
  tipo: z.string(),
  criador: z.number().nullable(),
  ultimo_editor: z.number().nullable(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
