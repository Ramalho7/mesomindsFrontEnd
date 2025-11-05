import { Button } from "@/components/ui/button";
import { useGetContentById } from "@/hooks/content/useGetContentById";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/content/$contentId")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };

  const { contentId } = useParams({ from: "/_dashboard/content/$contentId" });
  const {
    data: content,
    isLoading,
    isError,
  } = useGetContentById(Number(contentId));

  if (isLoading) {
    return <div>Carregando conteúdo...</div>;
  }

  if (isError || !content) {
    return <div>Erro ao carregar o conteúdo.</div>;
  }

  if (!content) {
    return <div>Conteúdo não encontrado.</div>;
  }

  return (
    <div className="flex flex-col gap-5 mt-7 mb-7 rounded-2xl border px-[24px] py-[24px]">
      <h1 className="font-black text-2xl border-b text-secondary ">
        Detalhes do Conteúdo
      </h1>
      <p>ID: {content.id}</p>
      <p>Título: {content.title}</p>
      <p>Corpo do conteúdo:</p>
      <div className="border rounded-2xl px-[24px] py-[24px]">
        <div
          dangerouslySetInnerHTML={{ __html: content.content }}
          className="prose prose-sm max-w-none"
        />
      </div>
      <Button type="submit" variant={"default"} onClick={handleBack}>
        Voltar
      </Button>
    </div>
  );
}
