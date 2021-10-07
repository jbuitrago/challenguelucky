import { Module } from '@nestjs/common';
import { CitiesModule } from 'src/cities/cities.module';
import { DbModule } from 'src/db/db.module';
import { UsersService } from './users.service';
import { CitiesService } from '../cities/cities.service'
import { AddressService } from 'src/address/address.service';
import { AddressModule } from 'src/address/address.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ProfilesService } from 'src/profiles/profiles.service';

@Module({
  imports: [DbModule,CitiesModule,AddressModule,ProfilesModule],
  providers: [UsersService,CitiesService,AddressService, ProfilesService],
  exports: [UsersService],
})
export class UsersModule {}
