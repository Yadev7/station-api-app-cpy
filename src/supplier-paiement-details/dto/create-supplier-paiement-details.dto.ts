import { SupplierIncomeDto } from '../../supplier-incomes/dto/supplier-income.dto';

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

export class CreateSupplierPaiementDetailsDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  paiementAmount?: number | null;

  @ApiProperty({
    required: false,
    type: () => SupplierIncomeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierIncomeDto)
  @IsNotEmptyObject()
  SupplierIncomeId?: SupplierIncomeDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
