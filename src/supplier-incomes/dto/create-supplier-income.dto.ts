import { SupplierBlDto } from '../../supplier-bls/dto/supplier-bl.dto';

import {
  // decorators here

  IsString,
  IsOptional,
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

export class CreateSupplierIncomeDto {
  @ApiProperty({
    required: false,
    type: () => SupplierBlDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierBlDto)
  @IsNotEmptyObject()
  SupplierBlId?: SupplierBlDto | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  comment?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  IncomeScan?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
