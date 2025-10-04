import { Product } from '../../products/domain/product';
import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierOrderDetails {
  @ApiProperty({
    type: () => Product,
    nullable: true,
  })
  ProductId?: Product | null;

  @ApiProperty({
    type: () => Supplier,
    nullable: true,
  })
  SupplierId?: Supplier | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  unitPrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  orderQty?: number | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
