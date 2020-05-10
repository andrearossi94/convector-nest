import { User } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envVariables as e } from '../env';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Personale } from '@convector-sample/personale-cc';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // richiamata da LocalStrategy
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    let authorized: boolean;
    if (e.authServiceUseMokedUsers === 'true') {
      authorized = (user && user.password === pass);
    } else {
      authorized = this.bcryptValidate(pass, (user as Personale).password);
    }

    if (authorized) {
      // protect expose password property to outside
      // use spread operator to assign password to password, and add all the other user props to result
      // richiesto .toJSON()
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  // richiamata da appController
  async login(user: User) {
    // scegliamo una proprietà sub per mantenere il nostro valore userId in modo da essere coerente con gli standard JWT, insieme alle altre proprietà da visualizzare
    const payload = { sub: user.id, username: user.username , email: user.email, firstname: user.firstname, lastname: user.lastname, roles: user.roles};
    return {
      // genera un jwt da un sottoinsieme delle proprietà dell'oggetto utente
      accessToken: this.jwtService.sign(payload),
    };
  }

  bcryptValidate = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }
}
