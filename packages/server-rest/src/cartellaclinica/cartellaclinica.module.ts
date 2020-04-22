import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CartellaclinicaController } from './cartellaclinica.controller';
//import { PersonService } from './cartellaclinica.service';

@Module({
  controllers: [CartellaclinicaController],
  //providers: [PersonService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})

export class CartellaclinicaModule { }
