import { Controller, Get, HttpStatus, Post, Request, Res, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiExcludeEndpoint, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import * as express from 'express';
import { AuthService } from './auth/auth.service';
import { GetProfileResponseDto } from './auth/dto/get-profile-response.dto';
import { LoginUserResponseDto } from './auth/dto/login-user-response.dto';
import { appConstants as c } from './constants';
import { envVariables as e } from './env';
import { LoginUserDto } from './auth/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(e.swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }

  // @Body Dto usato per aiutare swagger ad avere i parametri richiesti con le proprietà definite nei DTO 
  @Post(`/${e.swaggerApiPath}/login`)
  @ApiUseTags(e.swaggerModuleTagAuth)
  // si utilizza authGuard local (non defaultStrategy)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: c.API_OPERATION_AUTH_LOGIN })
  @ApiCreatedResponse({ description: c.API_RESPONSE_LOGIN, type: LoginUserResponseDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  async login(@Request() req, @Body() loginUser: LoginUserDto): Promise<LoginUserResponseDto> {
    // passport attaccherè l'user autenticato all'oggetto richiesto
    // @Body() loginUser: LoginUserDto è usato solo in swagger api,altrimenti non avremmo l'oggetto da riempire con le proprietà
    return this.authService.login(req.user);
  }

  // Quando la route GET /api/me viene raggiunta, la Guard automaticamente chiamerà la nostra logica di configurazione personalizzata di passport-jwt,
  // validazione del jwt e assegnargli la property dell'utente al Request Object
  @Get(`/${e.swaggerApiPath}/me`)
  @ApiUseTags(e.swaggerModuleTagAuth)
  // si utilizza la strategia jwt
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: c.API_OPERATION_GET_PROFILE })
  @ApiOkResponse({ description: c.API_RESPONSE_GET_PROFILE, type: GetProfileResponseDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  getProfile(@Request() req) {
    return req.user;
  }
}







