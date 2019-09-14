import { Attribute as AttributeConvectorModel, Person as PersonConvectorModel } from '@convector-sample/person-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { PersonControllerBackEnd } from '../convector';
import GetByAttributeInput from './dto/get-by-attribute.input';
import NewPersonInput from './dto/new-person.input';
import PersonArgs from './dto/person.args';
import Person from './models/person.model';
import AddPersonAttributeInput from './dto/add-person-attribute.input';
import LoginPersonInput from './dto/login-person.input';
// import { EasyconfigService, JsonWebTokenService } from '@koakh/nestjs-auth-quick-config';

@Injectable()
export default class PersonService {

  constructor(
    // private readonly authService: AuthService,
    // private readonly easyconfigService: EasyconfigService,
    // private readonly jsonWebTokenService: JsonWebTokenService,
  ) { }
  async findOneById(id: string): Promise<Person> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel = await PersonControllerBackEnd.get(id) as PersonConvectorModel;
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel = new PersonConvectorModel(fabricModel);
    // call common find method
    const model: Person = await this.findBy(convectorModel, null) as Person;
    // return model
    return model;
  }

  async findOneByUsername(username: string): Promise<Person> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel | PersonConvectorModel[] = await PersonControllerBackEnd.getByUsername(username) as PersonConvectorModel;
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel = new PersonConvectorModel(fabricModel[0]);
    // call common find method
    const model: Person = await this.findBy(convectorModel, null) as Person;
    // return model
    return model;
  }

  async findByAttribute({ id, content }: GetByAttributeInput, personArgs: PersonArgs): Promise<Person | Person[]> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel[] = await PersonControllerBackEnd.getByAttribute(id, content) as PersonConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel[] = fabricModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.findBy(convectorModel, personArgs) as Person[];
    // return model
    return model;
  }

  async findAll(personArgs: PersonArgs): Promise<Person[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<PersonConvectorModel[]>> = await PersonControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: PersonConvectorModel[] = flatConvectorModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.findBy(convectorModel, personArgs) as Person[];
    // return model
    return model;
  }

  async create(data: NewPersonInput): Promise<Person> {
    try {
      const personToCreate: PersonConvectorModel = new PersonConvectorModel({ ...data });
      await PersonControllerBackEnd.create(personToCreate);
      return await this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginPersonInput): Promise<string> {
    try {
      return '3ozutUzY09XA2IXAvxeTDs0lNbMvhID0UiPZYRGXG4GdsYuTG3kmbBhpEz3usg15';
      // const envVar = this.easyconfigService.get('ENV_VAR1');
      // const token = this.jsonWebTokenService.getToken({ username: 'koakh', sub: 28 });
      // return `Hello World! ${envVar} ${token}`;
    } catch (error) {
      throw error;
    }
  }

  async personAddAttribute(personId: string, addPersonAttributeInput: AddPersonAttributeInput): Promise<Person> {
    try {
      const attributeConvectorModel: AttributeConvectorModel = new AttributeConvectorModel(
        { ...addPersonAttributeInput },
      );
      // leave above line has a reminder, this is the hack to use content when it
      // don't have a @Validate annotation, read comments on Attribute person-cc
      // attributeConvectorModel.content = addPersonAttributeInput.content;
      await PersonControllerBackEnd.addAttribute(personId, attributeConvectorModel);
      return await this.findOneById(personId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: PersonConvectorModel | PersonConvectorModel[], personArgs: PersonArgs): Promise<Person | Person[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
        // convert attributes content to object { data: content }
        convectorModel.forEach((e: PersonConvectorModel) => {
          // only convert attributes if have attributes array
          if (Array.isArray(e.attributes)) {
            const modifiedAttributes = this.convertAttributes(e);
            // apply modifiedAttributes to current person
            e.attributes = [...modifiedAttributes] as AttributeConvectorModel[];
          }
        });
        // require to map fabric model to graphql Person[]
        return (personArgs)
          ? convectorModel.splice(personArgs.skip, personArgs.take) as unknown as Person[]
          : convectorModel as unknown as Person[];
      } else {
        // only convert attributes if have attributes array
        if (Array.isArray(convectorModel.attributes)) {
          const modifiedAttributes = this.convertAttributes(convectorModel);
          // apply modifiedAttributes to current person
          convectorModel.attributes = [...modifiedAttributes] as AttributeConvectorModel[];
        }
        // require to map fabric model to graphql Person[]
        return convectorModel as unknown as Person;
      }
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * function to convert property 'content' string to json object, if is a string object
   * to prevent error using GraphQLJSONObject custom scalar
   */
  convertAttributes(person: PersonConvectorModel): AttributeConvectorModel[] {
    // capture new mapped attributes
    const newAttributes = (person.attributes.map((attribute: AttributeConvectorModel) => {
      let newContent = attribute.content;
      if (typeof attribute.content !== 'object') {
        newContent = { data: attribute.content };
      }
      return { ...attribute, content: newContent };
    }));
    // require to cast to AttributeConvectorModel[]
    return newAttributes as AttributeConvectorModel[];
  }
}
