import { DevisDto } from '../../devis/dto/devis.dto';

import { SupplierDto } from '../../suppliers/dto/supplier.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsDate,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateSupplierOrderDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  orderSupplierState?: string | null;

  @ApiProperty({
    required: false,
    type: () => [DevisDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DevisDto)
  @IsArray()
  idDevis?: DevisDto[] | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  Amount?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  orderState?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  orderRef?: string | null;

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
    type: () => SupplierDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsNotEmptyObject()
  idSupplier?: SupplierDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
