import { Module } from '@nestjs/common';
import { NozzleRepository } from '../nozzle.repository';
import { NozzleRelationalRepository } from './repositories/nozzle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NozzleEntity } from './entities/nozzle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NozzleEntity])],
  providers: [
    {
      provide: NozzleRepository,
      useClass: NozzleRelationalRepository,
    },
  ],
  exports: [NozzleRepository],
})
export class RelationalNozzlePersistenceModule {}
