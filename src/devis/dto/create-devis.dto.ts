import { SupplierOrderDto } from '../../supplier-orders/dto/supplier-order.dto';

import { SupplierDto } from '../../suppliers/dto/supplier.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsDate,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
  Type,
} from 'class-transformer';

export class CreateDevisDto {
  @ApiProperty({
    required: true,
    type: () => SupplierOrderDto,
  })
  @ValidateNested()
  @Type(() => SupplierOrderDto)
  @IsNotEmptyObject()
  supplierOrderRef: SupplierOrderDto;

  @ApiProperty({
    required: false,
    type: () => SupplierDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsNotEmptyObject()
  idSupplier?: SupplierDto | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  comment?: string | null;

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
    type: () => String,
  })
  @IsOptional()
  @IsString()
  numRef?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
