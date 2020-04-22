import { Injectable, Logger } from '@nestjs/common';
import { Personale } from '@convector-sample/personale-cc';
import { PersonaleControllerBackEnd } from '../convector';
import { envVariables as e } from '../env';
import { RegisterPersonaleDto } from './dto';

@Injectable()
export class PersonaleService {

  public async getAll() {
    const viewUrl = '_design/personale/_view/all';
    const queryOptions = { startKey: [''], endKey: [''] };

    try {
      const result = (await Personale.query(Personale, e.couchDBView, viewUrl, queryOptions)) as Personale[];
      // map item toJson
      return await Promise.all(result.map(item => item.toJSON()));
    } catch (err) {
      Logger.log(err);
      if (err.code === 'EDOCMISSING') {
        return [];
      } else {
        throw err;
      }
    }
  }

  public async get(id: string): Promise<Personale> {
    try {
      return new Personale(await PersonaleControllerBackEnd.get(id));
    } catch (err) {
      throw err;
    }
  }
/*
    public async getByUsername(username: string): Promise<Person> {
      try {
        const user = await PersonControllerBackEnd.getByUsername(username);
        // create Person model
        const userModel = new Person((user[0]));
        return userModel;
      } catch (err) {
        throw err;
      }
    } */

  


  public async register(registerPersonaleDto: RegisterPersonaleDto) {
    try {
      const personaleToCreate = new Personale({ ...registerPersonaleDto });
      return await PersonaleControllerBackEnd.create(personaleToCreate);
    } catch (err) {
      throw err;
    }
  }
}
