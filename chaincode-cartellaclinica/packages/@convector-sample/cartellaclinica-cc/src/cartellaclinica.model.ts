import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Cartellaclinica extends ConvectorModel<Cartellaclinica> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.cartellaclinica';

  @Required()
  @Validate(yup.string())
  public pazienteID: string;

  @Required()
  @Validate(yup.string())
  public dottoreID: string;

  @Required()
  @Validate(yup.string())
  public patologia: string;

  @Required()
  @Validate(yup.boolean())
  public stato: boolean;

  @Required()
  @Validate(yup.boolean())
  public consenso: boolean;

  @ReadOnly()
  @Validate(yup.string())
  public msp: string;

  /*@ReadOnly()
  @Required()
  @Validate(yup.number())
  public created: number;

  @Required()
  @Validate(yup.number())
  public modified: number;*/
}
