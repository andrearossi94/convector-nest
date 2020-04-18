import { Controller, Get, HttpStatus, Post, Request, Res, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as express from 'express';
import { envVariables as e } from './env';
import { ApiBearerAuth, ApiCreatedResponse, ApiExcludeEndpoint, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(e.swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }
}

