import { TankDto } from '../../tanks/dto/tank.dto';

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

export class CreateSupplierBlTankStorageDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  storedQty?: number | null;

  @ApiProperty({
    required: false,
    type: () => TankDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TankDto)
  @IsNotEmptyObject()
  TankId?: TankDto | null;

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
