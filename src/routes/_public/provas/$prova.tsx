import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useGetQuestionCollectionById } from '@/hooks/questionCollection/useGetQuestionsCollectionById'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { QuestionInCollectionType } from '@/schemas/questionCollection/QuestionInCollection'
import TiptapReadOnly from '@/components/TipTap/TiptapReadOnly'

export const Route = createFileRoute('/_public/provas/$prova')({
  component: RouteComponent,
})

function RouteComponent() {
  const { prova } = Route.useParams()
  const router = useRouter()
  const { data: provaData, isLoading, isError } = useGetQuestionCollectionById(Number(prova))

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string | number, number | boolean | string>>({})
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [provaFinished, setProvaFinished] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Carregando prova...</p>
      </div>
    )
  }

  if (isError || !provaData) {
    return <div className="text-red-500">Erro ao carregar a prova.</div>
  }

  const questions = provaData.questions || []
  const currentQuestion = questions[currentQuestionIndex]

  console.log("Prova Data:", provaData)
  console.log("Questions:", questions)
  console.log("Current Question:", currentQuestion)
  console.log("Alternatives:", currentQuestion?.alternatives)

  const handleSelectAnswer = (questionId: number | string, answerId: number | boolean | string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))
  }

  const handleSubmitAnswer = (questionId: number) => {
    setSubmittedAnswers(prev => ({
      ...prev,
      [questionId]: true
    }))
  }

  const isQuestionAnswered = (question: QuestionInCollectionType) => {
    if (question.type === "VerdadeiroFalso" && question.alternatives) {
      return question.alternatives.every(alt => 
        selectedAnswers[`${question.id}-${alt.id}`] !== undefined
      )
    }
    return selectedAnswers[question.id] !== undefined
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setProvaFinished(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    let total = questions.length

    questions.forEach((question) => {
      if (submittedAnswers[question.id]) {
        if (question.type === "Multipla") {
          const correctAlt = question.alternatives?.find(alt => 
            typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct
          )
          if (selectedAnswers[question.id] === correctAlt?.id) {
            correct++
          }
        } else if (question.type === "VerdadeiroFalso") {
          let allCorrect = true
          question.alternatives?.forEach(alt => {
            const userAnswer = selectedAnswers[`${question.id}-${alt.id}`]
            const correctAnswer = typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct
            if (userAnswer !== correctAnswer) {
              allCorrect = false
            }
          })
          if (allCorrect) {
            correct++
          }
        }
      }
    })

    return { correct, total, percentage: (correct / total) * 100 }
  }

  if (provaFinished) {
    const score = calculateScore()
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl w-full bg-white border-2 border-secondary rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-secondary mb-6">Prova Finalizada!</h1>
          <div className="mb-8">
            <p className="text-6xl font-bold text-secondary mb-4">{score.percentage.toFixed(1)}%</p>
            <p className="text-xl text-gray-700">
              Você acertou <span className="font-bold text-secondary">{score.correct}</span> de{" "}
              <span className="font-bold">{score.total}</span> questões
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.history.back()} variant="outline">
              Voltar para Provas
            </Button>
            <Button onClick={() => {
              setCurrentQuestionIndex(0)
              setProvaFinished(false)
              setSubmittedAnswers({})
            }}>
              Revisar Respostas
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Nenhuma questão disponível nesta prova.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen px-4 py-10">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button onClick={() => router.history.back()} variant="outline" className="mb-4">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-secondary">{provaData.title}</h1>
          <p className="text-gray-600 mt-2">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <span className="bg-secondary py-2 px-3 rounded-lg text-secondary-foreground font-bold">
              {currentQuestion.title}
            </span>
          </div>

          <div className="mb-6">
            <TiptapReadOnly content={currentQuestion.content} />
          </div>

          <div className="mb-4">
            <span className="font-bold text-secondary">Tipo: </span>
            <span className="text-gray-700">{currentQuestion.type}</span>
          </div>

          {/* Multipla Escolha */}
          {currentQuestion.type === "Multipla" && currentQuestion.alternatives && (
            <div className="space-y-3 mb-6">
              <p className="font-bold text-secondary text-lg">Alternativas:</p>
              {currentQuestion.alternatives.map((alt) => (
                <label
                  key={alt.id}
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors ${
                    selectedAnswers[currentQuestion.id] === alt.id ? 'border-secondary bg-secondary/20' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={alt.id}
                    checked={selectedAnswers[currentQuestion.id] === alt.id}
                    onChange={() => handleSelectAnswer(currentQuestion.id, alt.id)}
                    disabled={submittedAnswers[currentQuestion.id]}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <TiptapReadOnly content={alt.content} />
                  </div>
                  {submittedAnswers[currentQuestion.id] && (
                    <span className={`ml-2 ${
                      (typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct) 
                        ? 'text-green-600 font-bold' 
                        : ''
                    }`}>
                      {(typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct) && '✓ Correta'}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}

          {/* Verdadeiro ou Falso */}
          {currentQuestion.type === "VerdadeiroFalso" && currentQuestion.alternatives && (
            <div className="space-y-3 mb-6">
              <p className="font-bold text-secondary text-lg">Avalie cada afirmação:</p>
              {currentQuestion.alternatives.map((alt) => (
                <div key={alt.id} className="border-2 border-gray-300 rounded-lg p-4">
                  <div className="mb-3 font-medium">
                    <TiptapReadOnly content={alt.content} />
                  </div>
                  <div className="flex gap-4">
                    <label
                      className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors flex-1 ${
                        selectedAnswers[`${currentQuestion.id}-${alt.id}`] === true ? 'border-secondary bg-secondary/20' : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}-alt-${alt.id}`}
                        value="true"
                        checked={selectedAnswers[`${currentQuestion.id}-${alt.id}`] === true}
                        onChange={() => handleSelectAnswer(`${currentQuestion.id}-${alt.id}`, true)}
                        disabled={submittedAnswers[currentQuestion.id]}
                      />
                      <span>Verdadeiro</span>
                    </label>
                    <label
                      className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors flex-1 ${
                        selectedAnswers[`${currentQuestion.id}-${alt.id}`] === false ? 'border-secondary bg-secondary/20' : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}-alt-${alt.id}`}
                        value="false"
                        checked={selectedAnswers[`${currentQuestion.id}-${alt.id}`] === false}
                        onChange={() => handleSelectAnswer(`${currentQuestion.id}-${alt.id}`, false)}
                        disabled={submittedAnswers[currentQuestion.id]}
                      />
                      <span>Falso</span>
                    </label>
                  </div>
                  {submittedAnswers[currentQuestion.id] && (
                    <div className="mt-2 text-sm">
                      <span className={`font-bold ${
                        (typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct) 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        Resposta correta: {(typeof alt.correct === 'number' ? alt.correct === 1 : alt.correct) ? 'Verdadeiro' : 'Falso'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Aberta */}
          {currentQuestion.type === "Aberta" && (
            <div className="mb-6">
              <p className="font-bold text-secondary text-lg mb-2">Sua resposta:</p>
              <textarea
                value={selectedAnswers[currentQuestion.id] as string || ""}
                onChange={(e) => handleSelectAnswer(currentQuestion.id, e.target.value)}
                disabled={submittedAnswers[currentQuestion.id]}
                className="w-full p-4 border-2 border-gray-300 rounded-lg min-h-[150px] focus:border-secondary focus:outline-none"
                placeholder="Digite sua resposta..."
              />
            </div>
          )}

          {/* Submit Button */}
          {!submittedAnswers[currentQuestion.id] && (
            <Button
              onClick={() => handleSubmitAnswer(currentQuestion.id)}
              disabled={!isQuestionAnswered(currentQuestion)}
              className="mb-4"
            >
              Verificar Resposta
            </Button>
          )}

          {submittedAnswers[currentQuestion.id] && currentQuestion.correction && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mt-4">
              <p className="font-bold text-blue-900 text-lg mb-3">Correção:</p>
              <div className="prose max-w-none text-blue-800"> 
                <TiptapReadOnly content={currentQuestion.correction }/>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            ← Anterior
          </Button>
          
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-full border-2 font-semibold transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-secondary text-white border-secondary'
                    : submittedAnswers[questions[index].id]
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-white border-gray-300 hover:border-secondary'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={!submittedAnswers[currentQuestion.id]}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima →'}
          </Button>
        </div>
      </div>
    </div>
  )
}
