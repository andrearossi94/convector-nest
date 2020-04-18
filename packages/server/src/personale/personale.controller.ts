import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
// DA REINSERIRE import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { Personale } from '@convector-sample/personale-cc';
import { appConstants as c } from '../constants';
import { PersonaleControllerBackEnd } from '../convector';
import { envVariables as e } from '../env';
import { RegisterPersonaleDto } from './dto';

@Controller(`${e.swaggerApiPath}/${e.swaggerModuleTagPersonale}`)
@ApiUseTags(e.swaggerModuleTagParticipant)
export class PersonaleController {

  @Get()
  @ApiBearerAuth()
  //@UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GET_ALL_PERSONALE })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  public async getAll() {
    try {
      return PersonaleControllerBackEnd.getAll();
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @ApiBearerAuth()
  //@UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GET_PERSONALE })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORD })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  public async get(@Param('id') id: string): Promise<Personale> {
    try {
      return await PersonaleControllerBackEnd.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiBearerAuth()
  //@UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_REGISTER_PERSONALE })
  @ApiCreatedResponse({ description: c.API_RESPONSE_CREATED, type: RegisterPersonaleDto })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  public async register(@Body() personaleDto: RegisterPersonaleDto): Promise<void> {
    try {
      return await PersonaleControllerBackEnd.register(personaleDto.personale);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(`${c.API_RESPONSE_BAD_REQUEST}: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
