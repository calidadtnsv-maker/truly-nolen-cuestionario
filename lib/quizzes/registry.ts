import { Quiz, AnyQuestion, buildAllQuestions } from "@/lib/quiz-types";
import { PROCESOS_QUIZ } from "@/lib/quizzes/procesos";
import { CUCARACHAS_QUIZ } from "@/lib/quizzes/cucarachas";
import { HORMIGAS_QUIZ } from "@/lib/quizzes/hormigas";
import { ROEDORES_QUIZ } from "@/lib/quizzes/roedores";

export const QUIZZES: Quiz[] = [PROCESOS_QUIZ, CUCARACHAS_QUIZ, HORMIGAS_QUIZ, ROEDORES_QUIZ];

export function getQuiz(quizId: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === quizId);
}

export function getAllQuestions(quizId: string): AnyQuestion[] {
  const quiz = getQuiz(quizId);
  if (!quiz) return [];
  return buildAllQuestions(quiz.sections);
}
