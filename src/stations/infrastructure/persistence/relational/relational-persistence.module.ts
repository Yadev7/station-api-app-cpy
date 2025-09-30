import { Module } from '@nestjs/common';
import { StationRepository } from '../station.repository';
import { StationRelationalRepository } from './repositories/station.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from './entities/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  providers: [
    {
      provide: StationRepository,
      useClass: StationRelationalRepository,
    },
  ],
  exports: [StationRepository],
})
export class RelationalStationPersistenceModule {}
