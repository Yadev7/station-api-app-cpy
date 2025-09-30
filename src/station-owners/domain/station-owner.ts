import { Station } from '../../stations/domain/station';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../shared/classes/address';
import { Contact } from '../../shared/classes/contact';

export class StationOwner {
  @ApiProperty({
    type: () => [Station],
    nullable: true,
  })
  stations?: Station[] | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  ownerType: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  ownerName: string;

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
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
