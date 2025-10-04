import { Devis } from '../../devis/domain/devis';
import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierOrder {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderSupplierState?: string | null;

  @ApiProperty({
    type: () => [Devis],
    nullable: true,
  })
  idDevis?: Devis[] | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  Amount?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderState?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  orderRef?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  date?: Date | null;

  @ApiProperty({
    type: () => Supplier,
    nullable: true,
  })
  idSupplier?: Supplier | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
