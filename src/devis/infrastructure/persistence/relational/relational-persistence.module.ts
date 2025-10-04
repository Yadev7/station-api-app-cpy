import { Module } from '@nestjs/common';
import { DevisRepository } from '../devis.repository';
import { DevisRelationalRepository } from './repositories/devis.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevisEntity } from './entities/devis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DevisEntity])],
  providers: [
    {
      provide: DevisRepository,
      useClass: DevisRelationalRepository,
    },
  ],
  exports: [DevisRepository],
})
export class RelationalDevisPersistenceModule {}
