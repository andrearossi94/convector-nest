import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
// DA REINSERIRE import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { Cartellaclinica } from '@convector-sample/cartellaclinica-cc';
import { appConstants as c } from '../constants';
import { envVariables as e } from '../env';
import { CreateCartellaclinicaDto, CambiaConsensoDto, DegenzaDto, GetCartellaclinicaDto, GetbyusernameCartellaclinicaDto } from './dto';
import { CartellaclinicaService } from './cartellaclinica.service';

@Controller(`${e.swaggerApiPath}/${e.swaggerModuleTagCartellaclinica}`)
@ApiUseTags(e.swaggerModuleTagCartellaclinica)
export class CartellaclinicaController {

  constructor(public cartellaclinicaService: CartellaclinicaService) { }

  @Get('/:pazienteid/getbyusername')
  /*@ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GET_ALL_PERSONS })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })  
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) */
  public async getbyusername(@Param('pazienteid') pazienteid: string): Promise<Cartellaclinica> {
    try {
      return await this.cartellaclinicaService.get(pazienteid);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  /*@ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GET_PERSON })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORD })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) */
  public async get(@Param('id') id: string): Promise<Cartellaclinica> {
    try {
      return await this.cartellaclinicaService.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  /*@ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_CREATE_PERSON })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS, type: CreatePersonDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) */
  public async create(@Body() createCartellaclinicaDto: CreateCartellaclinicaDto): Promise<void> {
    try {
      return this.cartellaclinicaService.create(createCartellaclinicaDto);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
// da guardare
  @Post('/:id/degenza')
  /*@ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_ADD_PERSON_ATTRIBUTE })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS, type: AddPersonAttributeDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) */
  public async degenza(@Param('id') id: string, @Body() degenzaDto: DegenzaDto): Promise<Cartellaclinica> {
    try {
      return (this.cartellaclinicaService.degenza(id) as Promise<Cartellaclinica>);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/cambiaconsenso')
  /*@ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_ADD_PERSONS_BY_ATTRIBUTE })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS, type: GetPersonByAttributeDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) */
  public async cambiaconsenso(@Param('id') id: string, @Body() cambiaconsensoDto: CambiaConsensoDto): Promise<Cartellaclinica> {
    try {
      return this.cartellaclinicaService.cambiaconsenso(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
