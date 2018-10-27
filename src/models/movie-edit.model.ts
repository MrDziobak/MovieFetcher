import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class MovieEditModel {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  title: string;
}
