import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CommentEditModel {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsInt()
  movieId: number;
}
