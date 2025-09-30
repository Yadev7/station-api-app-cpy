import { Module } from '@nestjs/common';
import { StationOwnerRepository } from '../station-owner.repository';
import { StationOwnerRelationalRepository } from './repositories/station-owner.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationOwnerEntity } from './entities/station-owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationOwnerEntity])],
  providers: [
    {
      provide: StationOwnerRepository,
      useClass: StationOwnerRelationalRepository,
    },
  ],
  exports: [StationOwnerRepository],
})
export class RelationalStationOwnerPersistenceModule {}
