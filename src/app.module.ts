import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CitiesModule } from './cities/cities.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [AuthModule, UsersModule, ProfilesModule, CitiesModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
