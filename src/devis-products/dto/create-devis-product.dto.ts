import { DevisDto } from '../../devis/dto/devis.dto';

import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateDevisProductDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  SupplierPrice?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  unit?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  Qty?: string | null;

  @ApiProperty({
    required: false,
    type: () => DevisDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DevisDto)
  @IsNotEmptyObject()
  idDevis?: DevisDto | null;

  @ApiProperty({
    required: false,
    type: () => ProductDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  idProduct?: ProductDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
