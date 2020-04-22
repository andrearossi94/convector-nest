import { Module } from '@nestjs/common';
import { PersonaleController } from './personale.controller';
import { PassportModule } from '@nestjs/passport';
import { PersonaleService } from './personale.service';

@Module({
  controllers: [PersonaleController],
  providers: [PersonaleService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})

export class PersonaleModule { }
