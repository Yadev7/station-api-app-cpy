import { Station } from '../../stations/domain/station';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/shared/classes/address';
import { Contact } from 'src/shared/classes/contact';

export class Deposit {
  @ApiProperty({
    type: () => Station,
    nullable: false,
  })
  station: Station;

  @ApiProperty({
    type: () => Contact,
    nullable: true,
  })
  contact?: Contact | null;

  @ApiProperty({
    type: () => Address,
    nullable: true,
  })
  address?: Address | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  desc?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
