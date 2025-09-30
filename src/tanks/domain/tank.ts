import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/domain/product';
import { Station } from 'src/stations/domain/station';

export class Tank {
  @ApiProperty({
    type: () => Product,
    nullable: false,
  })
  product: Product;

  @ApiProperty({
    type: () => Station,
    nullable: false,
  })
  station: Station;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  desc?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  maxCapacity?: number = 0;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  minCapacity?: number = 0;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  directSale: boolean = false;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  refId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
