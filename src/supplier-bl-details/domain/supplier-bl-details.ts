import { Product } from '../../products/domain/product';
import { SupplierBl } from '../../supplier-bls/domain/supplier-bl';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierBlDetails {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  price?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  unitPrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  deliveredQty?: number | null;

  @ApiProperty({
    type: () => Product,
    nullable: true,
  })
  ProductId?: Product | null;

  @ApiProperty({
    type: () => SupplierBl,
    nullable: true,
  })
  SupplierBlId?: SupplierBl | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
