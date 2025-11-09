import { useRouter } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Tiptap from "@/components/TipTap/Tiptap";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { extractBase64Images } from "@/utils/extractBase64Images";
import { postQuestion } from "@/service/question/PostQuestion";
import type { PostQuestionSchemaType } from "@/service/schemas/questionSchema/PostQuestionSchema";

export default function QuestionForm() {
  
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  }

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      title: "",
      content: "",
      correction: "",
      materia: null,
      type: "Multipla",
      alternatives: []
    }
  })

  const questionType = watch("type")

  return (
    <div>
      
    </div>
  )

}