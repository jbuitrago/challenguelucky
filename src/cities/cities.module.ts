import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CitiesService } from './cities.service';

@Module({
  imports: [DbModule],
  providers: [CitiesService]
})
export class CitiesModule {}
