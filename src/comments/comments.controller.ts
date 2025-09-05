import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

const THROTTLE_TTL = process.env.THROTTLE_TTL ? process.env.THROTTLE_TTL as any : 60000
const THROTTLER_LIMIT_COMMENT = process.env.THROTTLER_LIMIT_COMMENT ? process.env.THROTTLER_LIMIT_COMMENT as any : 60000

@UseGuards(ThrottlerGuard)
@Throttle({ default: { ttl: THROTTLE_TTL, limit: THROTTLER_LIMIT_COMMENT } })
@Controller('tickets/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request) {
    const authorId = (req.user as any).sub
    return this.commentsService.create(id, createCommentDto, authorId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
