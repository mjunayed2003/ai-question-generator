import { Injectable } from '@nestjs/common';
import { AIProvider } from '../interface/ai-provider.interface.js';
import { GenerateQuestionsDto } from '../dto/generate-questions.dto.js';

@Injectable()
export class MockProvider implements AIProvider {
  async generateQuestions(input: GenerateQuestionsDto) {
    return {
      mcqs: [
        {
          question: `What is ${input.topic}?`,
          options: [
            'Option A',
            'Option B',
            'Option C',
            'Option D',
          ],
          answer: 'Option A',
          difficulty: input.difficulty,
        },
      ],
      cqs: [],
    };
  }
}