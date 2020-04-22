import { ApiModelProperty } from '@nestjs/swagger';
import { Personale } from '../../../../personale-cc/src/personale.model';

export class RegisterPersonaleDto {
  @ApiModelProperty()
  readonly personale: Personale;
}