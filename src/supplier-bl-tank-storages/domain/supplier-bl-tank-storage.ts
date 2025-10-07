import { Tank } from '../../tanks/domain/tank';
import { Product } from '../../products/domain/product';
import { SupplierBl } from '../../supplier-bls/domain/supplier-bl';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierBlTankStorage {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  storedQty?: number | null;

  @ApiProperty({
    type: () => Tank,
    nullable: true,
  })
  TankId?: Tank | null;

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
