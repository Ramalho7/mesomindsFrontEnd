import { Button } from '@/components/ui/button';
import { useGetContentById } from '@/hooks/content/useGetContentById';
import { formatDate } from '@/utils/formatDate';
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'
import { Share2 } from 'lucide-react';

export const Route = createFileRoute('/_public/conteudos/$conteudoId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { conteudoId } = useParams({ from: "/_public/conteudos/$conteudoId" });

  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/conteudos/${conteudoId}`;

    if (navigator.share) {
      navigator.share({
        title: 'Compartilhar Conteúdo',
        text: 'Confira este conteúdo:',
        url: shareUrl,
      })
        .then(() => {
          console.log('Compartilhamento bem-sucedido!');
        })
        .catch((error) => {
          console.error('Erro ao compartilhar:', error);
        });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          alert('Link de compartilhamento copiado para a área de transferência!');
        })
        .catch(() => {
          alert('Falha ao copiar o link.');
        });
    } else {
      alert('A funcionalidade de compartilhamento não é suportada neste navegador.');
    }
  };

  const {
    data: content,
    isLoading,
    isError,
  } = useGetContentById(Number(conteudoId));

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
    <div className="flex flex-col mx-auto mt-10 mb-10 gap-10 w-full">
      <div className='font-black text-4xl text-secondary'>
        {content.title}
      </div>
      <div className='flex gap-[24px]'>
        <div>
          <div className='flex flex-col gap-[8px]'>
            <p>Data publicação: {formatDate(content.created_at)}</p>
          </div>

          <div>
            <p>Data última edição: {formatDate(content.updated_at)}</p>
          </div>
        </div>
        <div>
          <p>Criador por: <span className='underline decoration-secondary'>{content.creator?.nome}</span></p>
        </div>
        <div>
          <Share2 onClick={() => handleShare()} />
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: content.content }}
        className="prose prose-sm max-w-none border border-2 rounded-[16px] py-[24px] px-[24px]"
      />

      <div className='flex items-center gap-[8px] border border-2 rounded-[16px] py-[24px] px-[24px]'>
        <div className='h-[80px] w-[80px] rounded-full bg-gray-300'></div>
        <p className='text-lg font-bold'>{content.creator?.nome}</p>
      </div>
      <Button type="submit" variant={"default"} onClick={handleBack}>
        Voltar
      </Button>
    </div>
  )
}
