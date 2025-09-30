import { Module } from '@nestjs/common';
import { IsletRepository } from '../islet.repository';
import { IsletRelationalRepository } from './repositories/islet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsletEntity } from './entities/islet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IsletEntity])],
  providers: [
    {
      provide: IsletRepository,
      useClass: IsletRelationalRepository,
    },
  ],
  exports: [IsletRepository],
})
export class RelationalIsletPersistenceModule {}
