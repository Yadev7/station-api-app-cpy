import { Islet } from '../../islets/domain/islet';
import { Deposit } from '../../deposits/domain/deposit';
import { Product } from '../../products/domain/product';
import { StationOwner } from '../../station-owners/domain/station-owner';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../shared/classes/address';
import { Contact } from '../../shared/classes/contact';
import { Tank } from 'src/tanks/domain/tank';

export class Station {
  @ApiProperty({
    type: () => [Islet],
    nullable: true,
  })
  islets?: Islet[] | null;

  @ApiProperty({
    type: () => [Tank],
    nullable: true,
  })
  tanks?: Tank[] | null;

  @ApiProperty({
    type: () => [Deposit],
    nullable: true,
  })
  deposits?: Deposit[] | null;

  @ApiProperty({
    type: () => [Product],
    nullable: true,
  })
  products?: Product[] | null;

  @ApiProperty({
    type: () => StationOwner,
    nullable: false,
  })
  owner: StationOwner;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name?: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  ICE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  RC?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  IF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CNSS?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  tvaCarb?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  tvaLub?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  tvaService?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  tvaCoffeRest?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  tvaShop?: number | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: true,
  })
  displayHeader?: boolean | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: true,
  })
  displayFooter?: boolean | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  logo?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  stampImg?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  signatureImg?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  imgs?: string | null;

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
