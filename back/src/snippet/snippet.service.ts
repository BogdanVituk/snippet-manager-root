
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Snippet, SnippetDocument } from '../shemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snipet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const createdSnippet = new this.snippetModel(createSnippetDto);
    return createdSnippet.save();
  }

  async findAll(query: { q?: string; tag?: string; page?: number; limit?: number }) {
    const { q, tag, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    
    
    const filters: any = {};
    
    if (q) {
      filters.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ];
    }
    
    if (tag) {
      filters.tags = tag;
    }

    const [data, total] = await Promise.all([
      this.snippetModel.find(filters).limit(limit).skip(skip).sort({ createdAt: -1 }).exec(),
      this.snippetModel.countDocuments(filters),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Snippet> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID format');
    
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet) throw new NotFoundException(`Snippet with ID ${id} not found`);
    
    return snippet;
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID format');

    const updatedSnippet = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();

    if (!updatedSnippet) throw new NotFoundException(`Snippet with ID ${id} not found`);
    
    return updatedSnippet;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID format');
    
    const result = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Snippet with ID ${id} not found`);
    
    return { deleted: true };
  }

  async getUniqueTags(): Promise<string[]> {
    return this.snippetModel.distinct('tags').exec();
}
}