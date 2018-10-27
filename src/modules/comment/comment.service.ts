import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentEditModel } from '../../models/comment-edit.model';
import { MovieEntity } from '../movie/movie.entity';
import { MovieNotFoundException } from '../../exceptions/movie-not-found.exception';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(movieId?: number) {
    const where = movieId ? { movieId } : {};

    return await this.commentRepository.find({
      where,
      select: ['id', 'body', 'movieId'],
      order: { id: 'DESC' },
    });
  }

  async create(model: CommentEditModel) {
    const entity = new CommentEntity();

    entity.body = model.body;

    const movie = await this.movieRepository.findOne(model.movieId);

    if (!movie) throw new MovieNotFoundException();

    entity.movie = movie;

    const { id, movieId, body } = await this.commentRepository.save(entity);

    return { id, movieId, body };
  }
}
