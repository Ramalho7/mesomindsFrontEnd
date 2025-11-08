import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export default function QuestionForm({

}: ) {
  const router = useRouter()

  const handleBack = () => {
    router.history.back();
  }

  const { register, handleSubmit } = useForm();

  

}
