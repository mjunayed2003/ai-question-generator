import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { GenerateQuestionsDto } from './dto/generate-questions.dto.js';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}
    @Post("/generator")
    async generateQuestions(@Body() dto: GenerateQuestionsDto){
        return this.aiService.genarateQuestions(dto)
    }
}
