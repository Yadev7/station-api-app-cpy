import { SupplierBlDepositStorage } from '../../supplier-bl-deposit-storages/domain/supplier-bl-deposit-storage';
import { SupplierOrder } from '../../supplier-orders/domain/supplier-order';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierBl {
  @ApiProperty({
    type: () => SupplierBlDepositStorage,
    nullable: false,
  })
  SupplierBlDepositStorageRef: SupplierBlDepositStorage;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  amountPriceHt?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  SuppBlScan?: string | null;

  @ApiProperty({
    type: () => SupplierOrder,
    nullable: true,
  })
  SupplierOrderId?: SupplierOrder | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  comment?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  receptionDate?: Date | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
