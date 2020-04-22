import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaleModule } from './personale/personale.module';
import { CartellaclinicaModule } from './cartellaclinica/cartellaclinica.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, CartellaclinicaModule, PersonaleModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
