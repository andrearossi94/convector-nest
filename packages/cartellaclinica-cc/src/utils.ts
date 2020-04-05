import * as bcrypt from 'bcrypt';
import { appConstants as c } from '@convector-sample/common';
import { Personale } from '@convector-sample/personale-cc';

const bcryptSaltRounds: number = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcryptSaltRounds);
};

/**
 * get Personale by Identity/Fingerprint
 */
export const getPersonaleByIdentity = async (fingerprint: string): Promise<Personale> => {
  const personale: Personale | Personale[] = await Personale.query(Personale, {
    selector: {
      type: c.CONVECTOR_MODEL_PATH_PERSONALE ,
      identities: {
        $elemMatch: {
          fingerprint,
          status: true
        }
      }
    }
  });

  if (!!personale && !personale[0].id) {
    throw new Error('Cant find a personale with that fingerprint');
  }
  return personale[0];
}
