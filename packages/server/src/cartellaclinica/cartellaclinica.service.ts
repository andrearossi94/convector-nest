import { Injectable, Logger } from '@nestjs/common';
import { Cartellaclinica } from '@convector-sample/cartellaclinica-cc';
import { CartellaclinicaControllerBackEnd } from '../convector';
import { envVariables as e } from '../env';
import { CreateCartellaclinicaDto } from './dto';

@Injectable()
export class CartellaclinicaService {


  public async get(id: string): Promise<Cartellaclinica> {
    try {
      return new Cartellaclinica(await CartellaclinicaControllerBackEnd.get(id));
    } catch (err) {
      throw err;
    }
  }

  public async getByUsername(username: string): Promise<Cartellaclinica> {
    try {
      const user = await CartellaclinicaControllerBackEnd.getByUsername(username);
      // create Person model
      const userModel = new Cartellaclinica((user[0]));
      return userModel;
    } catch (err) {
      throw err;
    }
  }

  public async degenza(id: string) {    
    try{
      await CartellaclinicaControllerBackEnd.degenza(id);

     // const cartellaToReturn = new Cartellaclinica(await CartellaclinicaControllerBackEnd.get(id));
     // return cartellaToReturn.toJSON();
    }catch (err){
      throw err;
    }
    
  }

  public async cambiaconsenso(id: string) {
    try {

      await CartellaclinicaControllerBackEnd.cambiaconsenso(id);
     // const cartellaToReturn = new Cartellaclinica(await CartellaclinicaControllerBackEnd.get(id));
     // return cartellaToReturn.toJSON();
    } catch (err) {
      throw err;
    }
  }

  public async create(createCartellaclinicaDto: Cartellaclinica) {
    try {
      const cartellaclinicaToCreate = new Cartellaclinica(createCartellaclinicaDto );
      return await CartellaclinicaControllerBackEnd.create(cartellaclinicaToCreate);
    } catch (err) {
      throw err;
    }
  }
}

