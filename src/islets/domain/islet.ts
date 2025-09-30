import { Dispenser } from '../../dispensers/domain/dispenser';
import { Station } from '../../stations/domain/station';
import { ApiProperty } from '@nestjs/swagger';

export class Islet {
  @ApiProperty({
    type: () => [Dispenser],
    nullable: true,
  })
  dispensers?: Dispenser[] | null;

  @ApiProperty({
    type: () => Station,
    nullable: false,
  })
  station: Station;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  isletRef: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  desc?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
