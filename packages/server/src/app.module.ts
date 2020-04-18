import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaleModule } from './personale/personale.module';
import { CartellaclinicaModule } from './cartellaclinica/cartellaclinica.module';

@Module({
  imports: [PersonaleModule, CartellaclinicaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
