import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [DbModule],
  providers: [ProfilesService]
})
export class ProfilesModule {}
