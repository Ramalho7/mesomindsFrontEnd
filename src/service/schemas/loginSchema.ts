import { z } from "zod";
import { UserSchema } from "./UserSchema";

export const ResponseLoginShema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().min(1),
  user: UserSchema,
});

export const PayloadLoginShema = z.object({
  email: z.email({
    message: "Email inválido, informe um email com formato correto",
  }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export type PayloadLoginShemaType = z.infer<typeof PayloadLoginShema>;
