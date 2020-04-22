import * as yup from 'yup';
import {
  ConvectorModel, ReadOnly, Required, Validate, Default, FlatConvectorModel
} from '@worldsibu/convector-core';
export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = 'io.worldsibu.x509identity';

  @Validate(yup.boolean())
  @Required()
  status: boolean;
  @Validate(yup.string())
  @Required()
  fingerprint: string;
}
export class Personale extends ConvectorModel<Personale> {     // 2 tipi di personale: paziente e dottore
  @ReadOnly()
  public readonly type = 'io.worldsibu.personale';

  @Required()
  @Validate(yup.string())
  public firstname: string;

  @Required()
  @Validate(yup.string())
  public lastname: string;

  @Required()
  @Validate(yup.string())
  public username: string;

  @Required()
  @Validate(yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[1-9a-zA-Z]/, 'Password can only contain Latin letters and numbers.')
  )
  public password: string;

  @Required()
  @Validate(yup.string()
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
  )
  public email: string;

  @Default(['USER'])
  @Validate(yup.array().of(yup.string()))
  public roles: Array<String>;

  @ReadOnly()
  @Validate(yup.string())
  public msp: string;  

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;
}