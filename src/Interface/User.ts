export type User = {
  id: number;
  nome: string;
  email: string;
  tipo: "ADM" | "Operador" | "Moderador" | "Aluno" | "Professor" | undefined;
  criador: string | null;
  ultimo_editor: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

