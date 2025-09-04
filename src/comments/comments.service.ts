import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) { }
  async create(id: string, createCommentDto: CreateCommentDto, authorId: string) {
    const comment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        ticketId: id,
        authorId: authorId,
      }
    })
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
