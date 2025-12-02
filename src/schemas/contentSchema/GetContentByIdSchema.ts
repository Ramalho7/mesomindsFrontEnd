import { z } from "zod";
import { UserSchema } from "../UserSchema";
import { imageSchema } from "../imageSchema";

const contentTypeSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    status: z.enum(["Ativo", "Inativo"]),
    creator: UserSchema.nullish(),
    last_editor: UserSchema.nullish(),
});

const contentTagSchema = z.array(
    z.object({
        id: z.number(),
        tag_name: z.string(),
        is_moderator_only: z.number(),
        count: z.number(),
        description: z.string(),
        creator: UserSchema.nullish(),
        last_editor: UserSchema.nullish(),
        created_at: z.string(),
        updated_at: z.string(),
        status: z.enum(["Ativo", "Inativo"]),
        pivot: z.object({
            content_id: z.number(),
            tag_id: z.number(),
        }),
    }),
);

const getContentSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    id_materia: z.number().nullable(),
    content_types_id: z.number(),
    status: z.enum(["Ativo", "Inativo", "Rascunho"]),
    published_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    creator: UserSchema.nullish(),
    last_editor: UserSchema.nullish(),
    content_type: contentTypeSchema,
    content_tags: contentTagSchema,
    images: z.array(imageSchema).nullable(),
    is_moderator_only: z.boolean().optional(),
});

export type getContentSchema = z.infer<typeof getContentSchema>;

export const ContentByIdResponseSchema = z.object({
    success: z.boolean(),
    data: getContentSchema,
});