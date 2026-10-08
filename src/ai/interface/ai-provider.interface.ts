import { GenerateQuestionsDto } from "../dto/generate-questions.dto.js";

export interface AIProvider {
  generateQuestions(
    input: GenerateQuestionsDto,
  ): Promise<any>;
}

export const AI_PROVIDER = 'AI_PROVIDER';