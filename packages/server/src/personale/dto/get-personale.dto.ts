import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPersonaleDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;
}
