type Evaluation = "perfect" | "great" | "good";

interface Lecture {
  id: string;
  problem_statement: string;
  user_answer: string;
  evaluation: Evaluation;
  created_at: string;
}
export type { Lecture, Evaluation };
