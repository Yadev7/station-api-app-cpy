import {
  // decorators here

  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  MaxLength,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { StationDto } from 'src/stations/dto/station.dto';
import { ProductDto } from 'src/products/dto/product.dto';

export class CreateTankDto {
  @ApiProperty({
    required: true,
    type: () => ProductDto,
    description: 'product id  required',
  })
  @ValidateNested()
  @Type(() => StationDto)
  @IsNotEmptyObject()
  product: ProductDto;

  @ApiProperty({
    required: true,
    type: () => StationDto,
    description: 'station id  required',
  })
  @ValidateNested()
  @Type(() => StationDto)
  @IsNotEmptyObject()
  station: StationDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  desc?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    example: 1234.5678, // ✅ Example with 4 decimals
  })
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 4 }, // ✅ allows up to 4 decimals
    { message: 'maxCapacity must be a number with at most 4 decimal places' },
  )
  @Transform(({ value }) => value ?? 0) // ✅ ensures default 0 if missing
  maxCapacity?: number = 0;

  @ApiProperty({
    required: false,
    type: () => Number,
    example: 1234.5678, // ✅ Example with 4 decimals
  })
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 4 }, // ✅ allows up to 4 decimals
    { message: 'minCapacity must be a number with at most 4 decimal places' },
  )
  @Transform(({ value }) => value ?? 0) // ✅ ensures default 0 if missing
  minCapacity?: number = 0;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? false) // ✅ ensures default false if missing
  directSale: boolean = false; // ✅ ensures default at class level too

  @ApiProperty({
    required: true,
    type: () => String,
    maxLength: 10,
    description: 'Reference ID (max 10 characters)',
    example: 'ABC123',
  })
  @IsString()
  @MaxLength(10)
  refId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
