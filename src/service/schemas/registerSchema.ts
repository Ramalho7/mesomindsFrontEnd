import { z } from "zod";
import { UserSchema } from "./UserSchema";

export const ResponseRegisterShema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().min(1),
  user: UserSchema,
});

export const PayloadRegisterSchema = z
  .object({
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    email: z.email({ message: "O e-mail está fora do padrão" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    password_confirmation: z
      .string()
      .min(6, { message: "Confirmação de senha obrigatória" }),
    tipo: z.enum(["Aluno", "Professor"], {
      message: "O tipo do usuário precisar ser Aluno ou Professor",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não conferem",
    path: ["password_confirmation"],
  });

export type PayloadRegisterSchemaType = z.infer<typeof PayloadRegisterSchema>;
