import { SupplierIncome } from '../../supplier-incomes/domain/supplier-income';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierPaiementDetails {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  paiementAmount?: number | null;

  @ApiProperty({
    type: () => SupplierIncome,
    nullable: true,
  })
  SupplierIncomeId?: SupplierIncome | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
