import { useGetQuestions } from '@/hooks/question/useGetQuestions';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import TiptapReadOnly from '@/components/TipTap/TiptapReadOnly';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import type { QuestionDataType } from '@/service/schemas/questionSchema/ResponseQuestionSchema';

export const Route = createFileRoute('/_public/questoes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [enable, setEnabled] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"Multipla" | "VerdadeiroFalso" | "Aberta" | undefined>(undefined);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string | number, number | boolean | string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const handler = setTimeout(() => {
      setEnabled(true);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [search, type]);

  const { data: questions } = useGetQuestions(
    {
      search,
      status: "Active",
      type,
      page: currentPage,
    },
    enable,
  );

  const handleSelectAnswer = (questionId: number | string, answerId: number | boolean | string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleSubmitAnswer = (questionId: number) => {
    setSubmittedAnswers(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const isQuestionAnswered = (question: QuestionDataType) => {
    if (question.type === "VerdadeiroFalso" && question.alternatives) {
      return question.alternatives.every(alt => 
        selectedAnswers[`${question.id}-${alt.id}`] !== undefined
      );
    }
    return selectedAnswers[question.id] !== undefined;
  };

  return (
    <div className="flex flex-col mt-10">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-black text-2xl text-secondary">Questões</h1>
        </div>

        <Input
          id="input-search"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setEnabled(false);
          }}
          placeholder="Busque por questões"
          className="mt-[24px] mb-[16px]"
        />

        <select
          value={type || ""}
          onChange={(e) => {
            setType(e.target.value as any || undefined);
            setEnabled(false);
          }}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Selecione o tipo de questão</option>
          <option value="Multipla">Múltipla Escolha</option>
          <option value="VerdadeiroFalso">Verdadeiro ou Falso</option>
          <option value="Aberta">Aberta</option>
        </select>
      </div>

      <div className="flex flex-col mx-auto mt-10 mb-10 gap-10 w-full">
        {questions?.data.data?.map((question: QuestionDataType) => (
          <div key={question.id} className="border border-2 rounded-lg py-[24px] px-[24px] shadow-md">
            <div>
              <div className="flex justify-between mb-[16px]">
                <p>
                  <span className="bg-secondary py-[8px] px-[8px] rounded-lg text-secondary-foreground text-lg font-bold">
                    Questão
                  </span>{" "}
                  <span className="font-bold text-secondary">
                    {question.title}
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <TiptapReadOnly content={question.content} />
              </div>

              <div className="mb-4">
                <p className="flex gap-2 items-center mb-2">
                  <span className="font-bold text-secondary text-lg">
                    Tipo:
                  </span>
                  <span className="text-md underline decoration-accent">
                    {question.type}
                  </span>
                </p>
              </div>

              {question.type === "Multipla" && question.alternatives && (
                <div className="space-y-3 mb-6">
                  <p className="font-bold text-secondary text-lg">Alternativas:</p>
                  {question.alternatives.map((alt) => (
                    <label
                      key={alt.id}
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors ${
                        selectedAnswers[question.id] === alt.id ? 'border-secondary bg-secondary/20' : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={alt.id}
                        checked={selectedAnswers[question.id] === alt.id}
                        onChange={() => handleSelectAnswer(question.id, alt.id)}
                        disabled={submittedAnswers[question.id]}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <TiptapReadOnly content={alt.content} />
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {question.type === "VerdadeiroFalso" && question.alternatives && (
                <div className="space-y-3 mb-6">
                  <p className="font-bold text-secondary text-lg">Avalie cada afirmação:</p>
                  {question.alternatives.map((alt) => (
                    <div key={alt.id} className="border-2 border-gray-300 rounded-lg p-4">
                      <div className="mb-3 font-medium">
                        <TiptapReadOnly content={alt.content} />
                      </div>
                      <div className="flex gap-4">
                        <label
                          className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors flex-1 ${
                            selectedAnswers[`${question.id}-${alt.id}`] === true ? 'border-secondary bg-secondary/20' : 'border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}-alt-${alt.id}`}
                            value="true"
                            checked={selectedAnswers[`${question.id}-${alt.id}`] === true}
                            onChange={() => handleSelectAnswer(`${question.id}-${alt.id}`, true)}
                            disabled={submittedAnswers[question.id]}
                          />
                          <span>Verdadeiro</span>
                        </label>
                        <label
                          className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors flex-1 ${
                            selectedAnswers[`${question.id}-${alt.id}`] === false ? 'border-secondary bg-secondary/20' : 'border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}-alt-${alt.id}`}
                            value="false"
                            checked={selectedAnswers[`${question.id}-${alt.id}`] === false}
                            onChange={() => handleSelectAnswer(`${question.id}-${alt.id}`, false)}
                            disabled={submittedAnswers[question.id]}
                          />
                          <span>Falso</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "Aberta" && (
                <div className="mb-6">
                  <p className="font-bold text-secondary text-lg mb-2">Sua resposta:</p>
                  <textarea
                    value={selectedAnswers[question.id] as string || ""}
                    onChange={(e) => handleSelectAnswer(question.id, e.target.value)}
                    disabled={submittedAnswers[question.id]}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg min-h-[150px] focus:border-secondary focus:outline-none"
                    placeholder="Digite sua resposta..."
                  />
                </div>
              )}

              {!submittedAnswers[question.id] && (
                <Button
                  onClick={() => handleSubmitAnswer(question.id)}
                  disabled={!isQuestionAnswered(question)}
                  className="mb-4"
                >
                  Enviar Resposta
                </Button>
              )}

              {submittedAnswers[question.id] && question.correction && (
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mt-4">
                  <p className="font-bold text-blue-900 text-lg mb-3">Correção:</p>
                  <div className="text-blue-800">
                    <TiptapReadOnly content={question.correction} />
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="flex gap-2 items-center text-sm text-gray-600">
                  <span className="font-bold">
                    Data de criação:
                  </span>
                  {formatDate(question.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination className="mt-10 mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${questions?.data.prev_page_url ? questions?.data.prev_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const page = questions?.data.prev_page_url?.split("page=")[1];
                setCurrentPage(page ? parseInt(page, 10) : 1);
              }}
            />
          </PaginationItem>
          {questions?.data.links?.some(
            (link: any) => link.page && link.page > currentPage + 1,
          ) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {questions?.data.links
            ?.filter((link: any) => typeof link.page === "number")
            .reduce<any[]>((acc, link: any) => {
              if (!acc.some((item) => item.page === link.page)) {
                acc.push(link);
              }
              return acc;
            }, [])
            .filter((link: any) => {
              const currentPageNum = currentPage;
              return (
                link.page >= currentPageNum - 1 &&
                link.page <= currentPageNum + 1
              );
            })
            .map((link: any) => (
              <PaginationItem key={`page-${link.page}`}>
                <PaginationLink
                  href={`?page=${link.page}`}
                  isActive={link.active}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(link.page);
                  }}
                >
                  {link.page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {questions?.data.links?.some(
            (link: any) => link.page && link.page > currentPage + 1,
          ) && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={`?page=${questions?.data.next_page_url ? questions?.data.next_page_url.split("page=")[1] : 1}`}
              onClick={(e) => {
                e.preventDefault();
                const page = questions?.data.next_page_url?.split("page=")[1];
                setCurrentPage(page ? parseInt(page, 10) : 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}