import { ProductDto } from '../../products/dto/product.dto';

import { SupplierBlDto } from '../../supplier-bls/dto/supplier-bl.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateSupplierBlDetailsDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  price?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  unitPrice?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  deliveredQty?: number | null;

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
    type: () => SupplierBlDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierBlDto)
  @IsNotEmptyObject()
  SupplierBlId?: SupplierBlDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
