import { Quiz, AnyQuestion, buildAllQuestions } from "@/lib/quiz-types";
import { PROCESOS_QUIZ } from "@/lib/quizzes/procesos";
import { CUCARACHAS_QUIZ } from "@/lib/quizzes/cucarachas";

export const QUIZZES: Quiz[] = [PROCESOS_QUIZ, CUCARACHAS_QUIZ];

export function getQuiz(quizId: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === quizId);
}

export function getAllQuestions(quizId: string): AnyQuestion[] {
  const quiz = getQuiz(quizId);
  if (!quiz) return [];
  return buildAllQuestions(quiz.sections);
}
