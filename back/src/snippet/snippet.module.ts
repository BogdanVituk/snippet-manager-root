import { Module } from '@nestjs/common';
import { SnippetsService } from './snippet.service';
import { SnippetsController } from './snippet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from 'src/shemas/snippet.schema';

@Module({
  controllers: [SnippetsController],
  imports: [
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }])
  ],
  exports: [SnippetsService],
  providers: [SnippetsService],
})
export class SnippetModule {}
