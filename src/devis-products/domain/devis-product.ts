import { Devis } from '../../devis/domain/devis';
import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class DevisProduct {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  SupplierPrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  unit?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  Qty?: string | null;

  @ApiProperty({
    type: () => Devis,
    nullable: true,
  })
  idDevis?: Devis | null;

  @ApiProperty({
    type: () => Product,
    nullable: true,
  })
  idProduct?: Product | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
