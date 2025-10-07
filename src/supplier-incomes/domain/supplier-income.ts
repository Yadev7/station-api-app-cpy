import { SupplierBl } from '../../supplier-bls/domain/supplier-bl';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierIncome {
  @ApiProperty({
    type: () => SupplierBl,
    nullable: true,
  })
  SupplierBlId?: SupplierBl | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  comment?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  IncomeScan?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
