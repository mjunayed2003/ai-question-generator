import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

import { AIProvider } from '../interface/ai-provider.interface.js';
import { GenerateQuestionsDto } from '../dto/generate-questions.dto.js';

@Injectable()
export class GeminiProvider implements AIProvider {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async generateQuestions(input: GenerateQuestionsDto) {
    const prompt = `
You are an expert educational question generator.

Generate questions about:
${input.topic}

Requirements:
- MCQ count: ${input.mcqCount}
- CQ count: ${input.cqCount}
- Language: ${input.language}
- Difficulty: ${input.difficulty}

For every MCQ:
- question
- exactly 4 options
- correct answer
- explanation
- difficulty

For every CQ:
- stimulus
- sub-question a
- sub-question b
- sub-question c
- sub-question d
- difficulty
`;

    const response = await this.ai.models.generateContent({
      model: process.env.GEMINI_MODEL!,
      contents: prompt,

      config: {
        responseMimeType: 'application/json',

        responseSchema: {
          type: 'object',

          properties: {
            mcqs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: { type: 'string' },

                  options: {
                    type: 'array',
                    items: { type: 'string' },
                  },

                  answer: { type: 'string' },

                  explanation: {
                    type: 'string',
                  },

                  difficulty: {
                    type: 'string',
                  },
                },

                required: [
                  'question',
                  'options',
                  'answer',
                  'explanation',
                  'difficulty',
                ],
              },
            },

            cqs: {
              type: 'array',
              items: {
                type: 'object',

                properties: {
                  stimulus: {
                    type: 'string',
                  },

                  questions: {
                    type: 'object',

                    properties: {
                      a: { type: 'string' },
                      b: { type: 'string' },
                      c: { type: 'string' },
                      d: { type: 'string' },
                    },

                    required: ['a', 'b', 'c', 'd'],
                  },

                  difficulty: {
                    type: 'string',
                  },
                },

                required: [
                  'stimulus',
                  'questions',
                  'difficulty',
                ],
              },
            },
          },

          required: ['mcqs', 'cqs'],
        },
      },
    });

    if (!response.text) {
      throw new Error('Gemini returned an empty response');
    }

    return JSON.parse(response.text);
  }
}