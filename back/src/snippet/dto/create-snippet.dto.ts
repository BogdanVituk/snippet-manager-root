import { IsString, IsNotEmpty, IsArray, IsEnum, IsOptional, MinLength } from 'class-validator';
import { SnippetType } from '../../shemas/snippet.schema'

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(SnippetType, { message: 'Type must be: link, note or command' })
  type: SnippetType;
}
