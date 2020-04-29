import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { Cartellaclinica } from '@convector-sample/cartellaclinica-cc';
import { appConstants as c } from '../constants';
import { envVariables as e } from '../env';
import { CartellaclinicaControllerBackEnd } from '../convector';
import { CreateCartellaclinicaDto, CambiaConsensoDto, DegenzaDto, GetCartellaclinicaDto, GetbyusernameCartellaclinicaDto } from './dto';

//import { Cartellaclinica } from '../../../cartellaclinica-cc/src/cartellaclinica.model';
//import { CartellaclinicaService } from './cartellaclinica.service';

@Controller(`${e.swaggerApiPath}/${e.swaggerModuleTagCartellaclinica}`)
@ApiUseTags(e.swaggerModuleTagCartellaclinica)
export class CartellaclinicaController {

  //constructor(public cartellaclinicaService: CartellaclinicaService) { }

  @Get('/:pazienteid/getbyusername')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GETBYUSERNAME_CARTELLACLINICA })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })  
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) 
  public async getbyusername(@Param('pazienteid') pazienteid: string): Promise<Cartellaclinica> {
    try {
      return await CartellaclinicaControllerBackEnd.getByUsername(pazienteid);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GET_CARTELLACLINICA })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORD })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) 
  public async get(@Param('id') id: string): Promise<Cartellaclinica> {
    try {
      //return await this.cartellaclinicaService.get(id);
      return await CartellaclinicaControllerBackEnd.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_CREATE_CARTELLACLINICA })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS, type: CreateCartellaclinicaDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) 
   /*public async create(@Body('cartellaclinica') cartellaclinica: Cartellaclinica): Promise<Cartellaclinica> {
    try {
      return await CartellaclinicaControllerBackEnd.create(cartellaclinica) as unknown as Promise<Cartellaclinica>; */
      public async create(@Body() cartellaclinicaDto: CreateCartellaclinicaDto): Promise<Cartellaclinica> {
        try {
          return await CartellaclinicaControllerBackEnd.create(cartellaclinicaDto.cartellaclinica);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
// da guardare
  @Post('/:id/degenza')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_DEGENZA_CARTELLACLINICA })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS, type: DegenzaDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) 
  public async degenza(@Param('id') id: string): Promise<Cartellaclinica> {
    try {
      return await CartellaclinicaControllerBackEnd.degenza(id) as unknown as Promise<Cartellaclinica>;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/cambiaconsenso')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_CAMBIACONSENSO_CARTELLACLINICA })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS, type: CambiaConsensoDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED }) 
  public async cambiaconsenso(@Param('id') id: string): Promise<Cartellaclinica> {
    try {
      return await CartellaclinicaControllerBackEnd.cambiaconsenso(id) as unknown as Promise<Cartellaclinica>;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
