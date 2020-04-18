import { Module } from '@nestjs/common';
import { CartellaclinicaController } from './cartellaclinica.controller';
import { CartellaclinicaService } from './cartellaclinica.service';

@Module({
  controllers: [CartellaclinicaController],
  providers: [CartellaclinicaService]
})
export class CartellaclinicaModule {}
