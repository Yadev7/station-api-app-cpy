import { Module } from '@nestjs/common';
import { TankRepository } from '../tank.repository';
import { TankRelationalRepository } from './repositories/tank.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TankEntity } from './entities/tank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TankEntity])],
  providers: [
    {
      provide: TankRepository,
      useClass: TankRelationalRepository,
    },
  ],
  exports: [TankRepository],
})
export class RelationalTankPersistenceModule {}
