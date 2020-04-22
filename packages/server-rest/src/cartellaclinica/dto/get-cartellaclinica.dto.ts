import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCartellaclinicaDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;
}
