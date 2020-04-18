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
    

    await ControllerBackEnd.degenza(id);

    const personToReturn = new Cartellaclinica(await CartellaclinicaControllerBackEnd.get(id));
    return personToReturn.toJSON();
  }

  public async cambiaconsenso(id: string) {
    try {
      return await CartellaclinicaControllerBackEnd.cambiaconsenso(id);
    } catch (err) {
      throw err;
    }
  }

  public async create(createCartellaclinicaDto: CreateCartellaclinicaDto) {
    try {
      const cartellaclinicaToCreate = new Cartellaclinica({ ...createCartellaclinicaDto });
      return await CartellaclinicaControllerBackEnd.create(cartellaclinicaToCreate);
    } catch (err) {
      throw err;
    }
  }
}

