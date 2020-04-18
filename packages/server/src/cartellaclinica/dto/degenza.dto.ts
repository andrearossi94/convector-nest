import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DegenzaDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;
}
