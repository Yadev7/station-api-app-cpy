import { DepositDto } from '../../deposits/dto/deposit.dto';

import { ProductDto } from '../../products/dto/product.dto';

import { SupplierBlDto } from '../../supplier-bls/dto/supplier-bl.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  IsArray,
  ValidateNested,
  IsOptional,
  IsNotEmptyObject,
  IsDate,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateSupplierBlDepositStorageDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  storedQty?: number | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date?: Date | null;

  @ApiProperty({
    required: false,
    type: () => DepositDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DepositDto)
  @IsNotEmptyObject()
  depositId?: DepositDto | null;

  @ApiProperty({
    required: false,
    type: () => ProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  productId?: ProductDto | null;

  @ApiProperty({
    required: false,
    type: () => [SupplierBlDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierBlDto)
  @IsArray()
  SupplierBlId?: SupplierBlDto[] | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
