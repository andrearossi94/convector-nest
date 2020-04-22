import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PersonaleService } from '../personale/personale.service';

@Module({
  providers: [UsersService, PersonaleService],
  exports: [UsersService],
})

export class UsersModule { }
