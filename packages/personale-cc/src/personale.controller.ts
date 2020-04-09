import { appConstants as c } from '@convector-sample/common';
import { BaseStorage, Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ClientIdentity } from 'fabric-shim';
import * as yup from 'yup';
import { Personale } from './personale.model';

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
          type: c.CONVECTOR_MODEL_PATH_PERSONALE,
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
    return (await Personale.getAll(c.CONVECTOR_MODEL_PATH_PERSONALE)).map(personale => personale.toJSON() as any);
  }
}