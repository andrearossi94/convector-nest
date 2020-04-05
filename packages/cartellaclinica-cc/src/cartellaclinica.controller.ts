import { appConstants as c } from '@convector-sample/common';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { Personale } from '@convector-sample/personale-cc';
import * as yup from 'yup';
import { Attribute, Cartellaclinica } from './cartellaclinica.model';
import { getPersonaleByIdentity, hashPassword } from './utils';

@Controller('cartellaclinica')
export class CartellaclinicaController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Cartellaclinica)
    cartellaclinica: Cartellaclinica
  ) {
    // get host personale from fingerprint
    const personale: Personale = await getPersonaleByIdentity(this.sender);
    if (!!personale && !personale.id) {
      throw new Error('There is no personale with that identity');
    }

    const exists = await Cartellaclinica.getOne(cartellaclinica.id);
    if (!!exists && exists.id) {
      throw new Error('There is a cartellaclinica registered with that Id already');
    }

    const existsUsername = await Cartellaclinica.query(Cartellaclinica, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CARTELLACLINICA,
        username: cartellaclinica.username,
        personale: {
          id: personale.id
        }
      }
    });
    if (!!existsUsername && exists.id) {
      throw new Error('There is a cartellaclinica registered with that username already');
    }

    let gov = await Personale.getOne('gov');
    if (!gov || !gov.identities) {
      throw new Error('No government identity has been registered yet');
    }
    const govActiveIdentity = gov.identities.find(identity => identity.status === true);

    if (!govActiveIdentity) {
      throw new Error('No active identity found for personale');
    }
    if (this.sender !== govActiveIdentity.fingerprint) {
      throw new Error(`Just the government - ID=gov - can create people - requesting organization was ${this.sender}`);
    }

    // add personale
    cartellaclinica.personale = gov;
    // hashPassword before save model
    cartellaclinica.password = hashPassword(cartellaclinica.password);

    await cartellaclinica.save();
  }

  @Invokable()
  public async addAttribute(
    @Param(yup.string())
    cartellaclinicaId: string,
    @Param(Attribute.schema())
    attribute: Attribute
  ) {
    // Check if the "stated" personale as certifier of the attribute is actually the one making the request
    let personale = await Personale.getOne(attribute.certifierID);

    if (!personale || !personale.identities) {
      throw new Error(`No personale found with id ${attribute.certifierID}`);
    }

    const personaleActiveIdentity = personale.identities.find(
      identity => identity.status === true);

    if (!personaleActiveIdentity) {
      throw new Error('No active identity found for personale');
    }

    if (this.sender !== personaleActiveIdentity.fingerprint) {
      throw new Error(`Requester identity cannot sign with the current certificate ${this.sender}. This means that the user requesting the tx and the user set in the param certifierId do not match`);
    }

    let cartellaclinica = await Cartellaclinica.getOne(cartellaclinicaId);

    if (!cartellaclinica || !cartellaclinica.id) {
      throw new Error(`No cartellaclinica found with id ${cartellaclinicaId}`);
    }

    if (!cartellaclinica.attributes) {
      cartellaclinica.attributes = [];
    }

    let exists = cartellaclinica.attributes.find(attr => attr.id === attribute.id);

    if (!!exists) {
      let attributeOwner = await Personale.getOne(exists.certifierID);
      let attributeOwnerActiveIdentity = attributeOwner.identities.find(
        identity => identity.status === true);

      // Already has one, let's see if the requester has permissions to update it
      if (this.sender !== attributeOwnerActiveIdentity.fingerprint) {
        throw new Error(`User already has an attribute for ${attribute.id} but current identity cannot update it`);
      }
      // update as is the right attribute certifier
      exists = attribute;
    } else {
      cartellaclinica.attributes.push(attribute);
    }
    await cartellaclinica.save();
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Cartellaclinica.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No cartellaclinica exists with that ID ${id}`);
    }
    return existing;
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Cartellaclinica>[]> {
    return (await Cartellaclinica.getAll(c.CONVECTOR_MODEL_PATH_CARTELLACLINICA))
      .map(cartellaclinica => cartellaclinica.toJSON() as Cartellaclinica);
  }

  @Invokable()
  public async getByAttribute(
    @Param(yup.string())
    id: string,
    // find #STRING-OR-OBJECT
    // use if content is string
    // @Param(yup.mixed()) // this convert value to string, to keep the object use below @Param(yup.object())
    // use if content is object
    @Param(yup.object())   // this is used to use the value has a json object, ex "content": { "data": "1971", "work": true }
    value: any
  ) {
    return await Cartellaclinica.query(Cartellaclinica, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CARTELLACLINICA,
        attributes: {
          $elemMatch: {
            id: id,
            content: value
          }
        }
      }
    });
  }

  @Invokable()
  public async getByUsername(
    @Param(yup.string())
    username: string,
  ) {
    // get host personale from fingerprint
    const personale: Personale = await getPersonaleByIdentity(this.sender);
    const existing = await Cartellaclinica.query(Cartellaclinica, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CARTELLACLINICA,
        username,
        personale: {
          id: personale.id
        }
      }
    });
    if (!existing || !existing[0].id) {
      throw new Error(`No cartellaclinica exists with that username ${username}`);
    }
    return existing;
  }
}
