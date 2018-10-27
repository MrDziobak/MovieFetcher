import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { Repository } from 'typeorm';
import { MovieEditModel } from 'models/movie-edit.model';

@Injectable()
export class MovieService {
  // Any needed for typeorm types ...
  private readonly basicFields: any = ['id', 'title', 'extraData'];
  private readonly omdbApiKey = process.env.API_KEY;
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(
    start: number,
    limit: number,
    sortBy: string,
    sortDesc: boolean,
  ) {
    return await this.movieRepository.find({
      skip: start,
      take: limit,
      order: { [sortBy]: sortDesc ? 'DESC' : 'ASC' },
      select: this.basicFields,
    });
  }

  async create(model: MovieEditModel) {
    const existingMovie = await this.movieRepository.findOne({
      where: { title: model.title },
      select: this.basicFields,
    });

    if (existingMovie) return existingMovie;

    const extraData = await this.fetchMovieData(model.title);

    return await this.movieRepository.save({ ...model, extraData });
  }

  private async fetchMovieData(title: string) {
    const params = new URLSearchParams();

    params.set('apikey', this.omdbApiKey);
    params.set('t', title);

    const result = await fetch(`http://www.omdbapi.com/?${params.toString()}`);
    const data = await result.json();

    if (data.Response === 'False') return {};

    return data;
  }
}
