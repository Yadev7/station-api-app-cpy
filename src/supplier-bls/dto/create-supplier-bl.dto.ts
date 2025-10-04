import { SupplierOrderDto } from '../../supplier-orders/dto/supplier-order.dto';

import {
  // decorators here

  Transform,
  Type,
} from 'class-transformer';

import {
  // decorators here

  IsOptional,
  IsDate,
  IsString,
  ValidateNested,
  IsNotEmptyObject,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateSupplierBlDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  amountPriceHt?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  SuppBlScan?: string | null;

  @ApiProperty({
    required: false,
    type: () => SupplierOrderDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierOrderDto)
  @IsNotEmptyObject()
  SupplierOrderId?: SupplierOrderDto | null;

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
  receptionDate?: Date | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
