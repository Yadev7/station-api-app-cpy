import { Station } from '../../stations/domain/station';
import { Category } from '../../categories/domain/category';
import { ApiProperty } from '@nestjs/swagger';
import { PriceHistory } from '../../shared/classes/pricehistory';
import { Tank } from 'src/tanks/domain/tank';
export class Product {
  @ApiProperty({
    type: () => [Tank],
    nullable: true,
  })
  tanks?: Tank[] | null;

  @ApiProperty({
    type: () => Station,
    nullable: false,
  })
  station: Station;

  @ApiProperty({
    type: () => Category,
    nullable: false,
  })
  category: Category;

  @ApiProperty({
    type: () => [PriceHistory],
    isArray: true,
    nullable: true,
  })
  pricesHistory?: PriceHistory[] | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  dateAppliedPrices?: Date | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  salePrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  purchasePrice?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  unit?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  totalQuantity?: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  desc?: string | null;

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
