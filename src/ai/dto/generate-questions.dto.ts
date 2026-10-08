import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class GenerateQuestionsDto {
  @ApiProperty({ example: 'Photosynthesis' })
  @IsString()
  topic: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  mcqCount: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(0)
  cqCount: number;

  @ApiProperty({ example: 'English' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'medium' })
  @IsString()
  difficulty: string;
}