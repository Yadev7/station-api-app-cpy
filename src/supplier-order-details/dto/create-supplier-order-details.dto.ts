import { ProductDto } from '../../products/dto/product.dto';

import { SupplierDto } from '../../suppliers/dto/supplier.dto';

import {
  // decorators here

  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateSupplierOrderDetailsDto {
  @ApiProperty({
    required: false,
    type: () => ProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  ProductId?: ProductDto | null;

  @ApiProperty({
    required: false,
    type: () => SupplierDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsNotEmptyObject()
  SupplierId?: SupplierDto | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsString()
  unitPrice?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  orderQty?: number | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
