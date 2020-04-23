import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetbyusernameCartellaclinicaDto {
  @ApiModelProperty()
  @IsString()
  readonly pazienteid: string;
}



