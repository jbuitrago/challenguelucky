import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AddressService } from './address.service';

@Module({
  imports: [DbModule],
  providers: [AddressService]
})
export class AddressModule {}
