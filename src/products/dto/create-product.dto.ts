import { StationDto } from '../../stations/dto/station.dto';

import { CategoryDto } from '../../categories/dto/category.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  Min,
  ValidateNested,
  IsNotEmptyObject,
  IsArray,
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
import { PriceHistoryDto } from '../../shared/Dto/priceHstory.dto';
import { TankDto } from 'src/tanks/dto/tank.dto';
export class CreateProductDto {
  @ApiProperty({
    required: false,
    type: () => [TankDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TankDto)
  @IsArray()
  tanks?: TankDto[] | null;

  @ApiProperty({
    required: true,
    type: () => StationDto,
  })
  @ValidateNested()
  @Type(() => StationDto)
  @IsNotEmptyObject()
  station: StationDto;

  @ApiProperty({
    required: true,
    type: () => CategoryDto,
  })
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsNotEmptyObject()
  category: CategoryDto;

  @ApiProperty({
    required: false,
    type: () => [PriceHistoryDto],
    isArray: true,
  })
  @IsOptional()
  @IsString()
  pricesHistory?: PriceHistoryDto[] | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateAppliedPrices?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    example: 19.99,
    description: 'Sale price as a number',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Sale price must be a number with max 2 decimals' },
  )
  @Min(0, { message: 'Sale price cannot be negative' })
  @IsOptional()
  salePrice?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    example: 19.99,
    description: 'Sale price as a number',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Purchase price must be a number with max 2 decimals' },
  )
  @Min(0, { message: 'Purchase price cannot be negative' })
  @IsOptional()
  purchasePrice?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  unit?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    example: 19.99,
    description: 'Sale price as a number',
  })
  @IsNumber(
    { maxDecimalPlaces: 3 },
    { message: 'Quantity must be a number with max 3 decimals' },
  )
  @Min(0, { message: 'Quantity cannot be negative' })
  @IsOptional()
  totalQuantity?: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  desc?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  name?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
