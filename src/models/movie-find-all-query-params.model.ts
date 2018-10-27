import {
  ValidateIf,
  IsEnum,
  IsNumberString,
  IsBooleanString,
} from 'class-validator';

enum SortBy {
  id = 'id',
  title = 'title',
}

export class MovieFindAllQueryParamsModel {
  @ValidateIf(instance => instance.limit)
  @IsNumberString()
  readonly limit?: string;

  @ValidateIf(instance => instance.start)
  @IsNumberString()
  readonly start?: string;

  @ValidateIf(instance => instance.sortBy)
  @IsEnum(SortBy)
  readonly sortBy?: string;

  @ValidateIf(instance => instance.sortDesc)
  @IsBooleanString()
  readonly sortDesc?: string;
}
