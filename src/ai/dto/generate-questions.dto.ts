import { IsInt, IsString, Min } from "class-validator";


export class GenerateQuestionsDto {
    @IsString()
    topic: string;

    @IsInt()
    @Min(0)
    mcqCount: number;

    @IsInt()
    @Min(0)
    cqCount: number;

    @IsString()
    language: string;

    @IsString()
    difficulty: string;

}

