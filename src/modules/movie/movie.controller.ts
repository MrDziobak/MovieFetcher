import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { MovieEditModel } from '../../models/movie-edit.model';
import { MovieService } from './movie.service';
import { MovieFindAllQueryParamsModel } from '../../models/movie-find-all-query-params.model';

@ApiUseTags('Movies')
@Controller('api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiImplicitQuery({
    name: 'limit',
    type: 'integer',
    description: 'Default: 20',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'start',
    type: 'integer',
    description: 'Default 0',
    required: false,
  })
  @ApiImplicitQuery({ name: 'sortBy', enum: ['id', 'title'], required: false })
  @ApiImplicitQuery({
    name: 'sortDesc',
    type: Boolean,
    description: 'Default: false',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Fetch all movies.',
  })
  async findAll(@Query() queryParams: MovieFindAllQueryParamsModel) {
    const limit = parseInt(queryParams.limit, 0) || 20;
    const start = parseInt(queryParams.start, 0) || 0;
    const sortBy = queryParams.sortBy || 'title';
    const sortDesc = queryParams.sortDesc === 'true';

    return await this.movieService.findAll(start, limit, sortBy, sortDesc);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Saved movie data.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation problem.',
  })
  async createMovie(@Body() model: MovieEditModel) {
    return await this.movieService.create(model);
  }
}
