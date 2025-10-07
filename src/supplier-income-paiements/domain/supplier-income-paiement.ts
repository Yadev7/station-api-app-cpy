import { ApiProperty } from '@nestjs/swagger';

export class SupplierIncomePaiement {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  paiementType?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
