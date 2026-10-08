import { Injectable } from '@nestjs/common';
import { MockProvider } from './provider/mock.provider.js';
import { GenerateQuestionsDto } from './dto/generate-questions.dto.js';

@Injectable()
export class AiService {
    private readonly provider = new MockProvider();
    async genarateQuestions(input: GenerateQuestionsDto){
        return this.provider.generateQuestions(input);
    }

}