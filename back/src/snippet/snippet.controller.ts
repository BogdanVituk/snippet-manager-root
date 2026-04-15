import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query 
} from '@nestjs/common';
import { SnippetsService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snipet.dto';

@Controller('snippets') 
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  async create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  async findAll(
    @Query('q') q?: string,
    @Query('tag') tag?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    
    return this.snippetsService.findAll({ 
      q, 
      tag, 
      page: page ? Number(page) : undefined, 
      limit: limit ? Number(limit) : undefined 
    });
  }

  @Get('tags')
  async getTags() {
    return this.snippetsService.getUniqueTags();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateSnippetDto: UpdateSnippetDto
  ) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.snippetsService.remove(id);
  }


}