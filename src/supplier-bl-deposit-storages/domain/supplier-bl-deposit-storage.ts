import { Deposit } from '../../deposits/domain/deposit';
import { Product } from '../../products/domain/product';
import { SupplierBl } from '../../supplier-bls/domain/supplier-bl';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierBlDepositStorage {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  storedQty?: number | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  date?: Date | null;

  @ApiProperty({
    type: () => Deposit,
    nullable: true,
  })
  depositId?: Deposit | null;

  @ApiProperty({
    type: () => Product,
    nullable: true,
  })
  productId?: Product | null;

  @ApiProperty({
    type: () => [SupplierBl],
    nullable: true,
  })
  SupplierBlId?: SupplierBl[] | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
