import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from '../../shared/dto/contact.dto';
import { AddressDto } from '../../shared/dto/address.dto';

export class Supplier {
  @ApiProperty({
    type: () => ContactDto,
    nullable: true,
  })
  contact?: ContactDto | null;

  @ApiProperty({
    type: () => AddressDto,
    nullable: true,
  })
  address?: AddressDto | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  ice?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
