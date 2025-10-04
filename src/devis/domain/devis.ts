import { SupplierOrder } from '../../supplier-orders/domain/supplier-order';
import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class Devis {
  @ApiProperty({
    type: () => SupplierOrder,
    nullable: false,
  })
  supplierOrderRef: SupplierOrder;

  @ApiProperty({
    type: () => Supplier,
    nullable: true,
  })
  idSupplier?: Supplier | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  comment?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  date?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  numRef?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
