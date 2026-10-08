export interface AIProvider {
  generateQuestions(input: {
    topic: string;
    mcqCount: number;
    cqCount: number;
    language: string;
    difficulty: string;
  }): Promise<any>;
}