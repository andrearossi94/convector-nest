import * as yup from 'yup';

import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  BaseStorage,
  FlatConvectorModel
} from '@worldsibu/convector-core';

import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';

import { Personale } from './personale.model';
import { ClientIdentity } from 'fabric-shim';
import { hashPassword } from './utils';


@Controller('personale')
export class PersonaleController extends ConvectorController {
  get fullIdentity(): ClientIdentity {
    const stub = (BaseStorage.current as any).stubHelper;
    return new ClientIdentity(stub.getStub());
  };
  @Invokable()
  public async register(
    @Param(Personale)
    personale: Personale

  ) {
    // Retrieve to see if exists
    const existing = await Personale.getOne(personale.id);
    if (!existing || !existing.id) {
      const exists = await Personale.query(Personale, {
        selector: {
          type: 'io.worldsibu.personale',
          ['username']: personale.username,
        }
      });
      if ((exists as Personale[]).length > 0) {
        throw new Error('There is a person registered with that username already');
      }

      personale.msp = this.tx.identity.getMSPID();
      // Create a new identity
      personale.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      console.log(JSON.stringify(personale));
      
      //Hash della password con bcrypt
      personale.password = hashPassword(personale.password);
      await personale.save();
    } else {
      throw new Error('this paziente exists already');
    }
  }
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Personale.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No identity exists with that ID ${id}`);
    }
    return existing;
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Personale>[]> {
    return (await Personale.getAll('io.worldsibu.personale')).map(personale => personale.toJSON() as any);
  }
}