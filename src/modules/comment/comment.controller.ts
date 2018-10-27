import {
  Controller,
  Get,
  Body,
  Post,
  HttpException,
  Query,
} from '@nestjs/common';
import { ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentEditModel } from '../../models/comment-edit.model';
import { MovieNotFoundException } from '../../exceptions/movie-not-found.exception';
import { CommentFindAllQueryParamsModel } from '../../models/comment-find-all-query-params.model';

@ApiUseTags('Comments')
@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiImplicitQuery({
    name: 'movieId',
    type: 'interger',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Fetch all comments.',
  })
  async findAll(@Query() queryParams: CommentFindAllQueryParamsModel) {
    const moveId = parseInt(queryParams.movieId, 0) || undefined;

    return await this.commentService.findAll(moveId);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Saved comment data.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation problem.',
  })
  async createComment(@Body() model: CommentEditModel) {
    try {
      return await this.commentService.create(model);
    } catch (error) {
      // In the future change it to pretty json object
      if (error instanceof MovieNotFoundException)
        throw new HttpException('Movie not found.', 400);
    }
  }
}
