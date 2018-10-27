import { ValidateIf, IsNumberString } from 'class-validator';

export class CommentFindAllQueryParamsModel {
  @ValidateIf(instance => instance.movieId)
  @IsNumberString()
  movieId?: string;
}
