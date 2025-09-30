import { Nozzle } from '../../nozzles/domain/nozzle';
import { Islet } from '../../islets/domain/islet';
import { ApiProperty } from '@nestjs/swagger';

export class Dispenser {
  @ApiProperty({
    type: () => [Nozzle],
    nullable: true,
  })
  nozzles?: Nozzle[] | null;

  @ApiProperty({
    type: () => Islet,
    nullable: false,
  })
  islet: Islet;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  dispRef: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  desc?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  brand?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
