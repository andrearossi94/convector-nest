import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Cartellaclinica } from '../../../../cartellaclinica-cc/src/cartellaclinica.model';

export class CreateCartellaclinicaDto {
  @ApiModelProperty()
  readonly cartellaclinica: Cartellaclinica;
}
