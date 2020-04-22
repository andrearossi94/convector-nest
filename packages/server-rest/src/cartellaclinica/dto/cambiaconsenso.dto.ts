import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CambiaConsensoDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;
}


