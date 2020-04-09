import { appConstants as c } from '@convector-sample/common';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { Personale } from '@convector-sample/personale-cc';
import * as yup from 'yup';
import { /*Attribute,*/ Cartellaclinica } from './cartellaclinica.model';
import { getPersonaleByIdentity, hashPassword } from './utils';

@Controller('cartellaclinica')
export class CartellaclinicaController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Cartellaclinica)
    cartellaclinica: Cartellaclinica
  ) {
    //let cartellaclinica = new Cartellaclinica(id);
    let cc = await Cartellaclinica.getOne(cartellaclinica.id);
    //let doc = await Personale.getOne(this.sender)
    if (cc.id) {
      throw new Error(`Cartellaclinica with id ${cartellaclinica.id} does already exist`);
    }

    let dottore = await Personale.getOne(cartellaclinica.dottoreID);
    
    if (!dottore || !dottore.identities) {
      throw new Error('Referenced owner personale does not exist in the ledger');
    }

    const dottoreCurrentIdentity = dottore.identities.filter(identity => identity.status === true)[0];
   
    if (dottoreCurrentIdentity.fingerprint === this.sender) {      
      await cartellaclinica.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to update ${dottoreCurrentIdentity} cartellaclinica just can`);
    }
    ///await cartellaclinica.save();
  }

  @Invokable()
  public async degenza( //cambio stato cartellaclinica : guarito o no
    @Param(yup.string())
    id: string/*,
    @Param(yup.boolean())
    stato: boolean,*/
  ){
    let cartellaclinica = await Cartellaclinica.getOne(id);
    
    if (!cartellaclinica || !cartellaclinica.id) {
      throw new Error(`Cartellaclinica with id ${id} does not exist`);
    }
    //const dottoreID = cartellaclinica.dottoreID;
    let dottore = await Personale.getOne(cartellaclinica.dottoreID);
    
    if (!dottore || !dottore.identities) {
      throw new Error('Referenced owner personale does not exist in the ledger');
    }

    const dottoreCurrentIdentity = dottore.identities.filter(identity => identity.status === true)[0];
   
    if (dottoreCurrentIdentity.fingerprint === this.sender) {
      cartellaclinica.stato = !cartellaclinica.stato;
      await cartellaclinica.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to update ${dottoreCurrentIdentity} cartellaclinica just can`);
    }
  }

  @Invokable()
  public async cambiaconsenso(
    @Param(yup.string())
    id: string
   /* @Param(yup.boolean())
    consenso: boolean*/
  ){
    let cartellaclinica = await Cartellaclinica.getOne(id); //prende una cartella 
    
    if (!cartellaclinica || !cartellaclinica.id) {
      throw new Error(`Cartellaclinica with id ${id} does not exist`);
    }
    
    let paziente = await Personale.getOne(cartellaclinica.pazienteID); //estrapolo id del paziente
    
    if (!paziente || !paziente.identities) {
      throw new Error('Referenced owner personale does not exist in the ledger');
    }

    const pazienteCurrentIdentity = paziente.identities.filter(identity => identity.status === true)[0]; 
   
    if (pazienteCurrentIdentity.fingerprint === this.sender) { // se è la stessa persona posso revocare consenso alla cartella
      cartellaclinica.consenso = !cartellaclinica.consenso;
      await cartellaclinica.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to update ${pazienteCurrentIdentity} cartellaclinica just can`);
    }
  }
  
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    let cartellaclinica = await Cartellaclinica.getOne(id);
    let dottore = await Personale.getOne(cartellaclinica.dottoreID);
    let paziente = await Personale.getOne(cartellaclinica.pazienteID);


    const dotActiveIdentity = dottore.identities.filter(identity => identity.status === true)[0];
    const pazActiveIdentity = paziente.identities.filter(identity => identity.status === true)[0]

    if((dotActiveIdentity.fingerprint === this.sender && cartellaclinica.consenso) || pazActiveIdentity.fingerprint === this.sender){
      return cartellaclinica;
    }else{
      throw new Error(`Identity ${this.sender} is not allowed to views this certificate`);
    }
    //return await Cartellaclinica.getOne(id);
  }

  /*@Invokable()
  public async getAll(): Promise<FlatConvectorModel<Cartellaclinica>[]> {
    return (await Cartellaclinica.getAll(c.CONVECTOR_MODEL_PATH_CARTELLACLINICA))
      .map(cartellaclinica => cartellaclinica.toJSON() as Cartellaclinica);
  }*/

  @Invokable()
  public async getByUsername(
    @Param(yup.string())
    pazienteid: string,
  ) {
    // get host personale from fingerprint
    //const personale: Personale = await getPersonaleByIdentity(this.sender);
    /*const existing = await Cartellaclinica.query(Cartellaclinica, {
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
    }*/
    const exists = await Cartellaclinica.query(Cartellaclinica, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CARTELLACLINICA,
        ['pazienteID']: pazienteid,
      }
    });
    if ((exists as Cartellaclinica[]).length <= 0) {
      throw new Error('There is a person registered with that username already');
    }
    let dottore = await Personale.getOne(exists[0].dottoreID);
    let paziente = await Personale.getOne(exists[0].pazienteID);


    const dotActiveIdentity = dottore.identities.filter(identity => identity.status === true)[0];
    const pazActiveIdentity = paziente.identities.filter(identity => identity.status === true)[0]

    if((dotActiveIdentity.fingerprint === this.sender && exists[0].consenso) || pazActiveIdentity.fingerprint === this.sender){
      return exists[0];
    }else{
      throw new Error(`Identity ${this.sender} is not allowed to views this certificate`);
    }
    //return exists;
    
  }
}
