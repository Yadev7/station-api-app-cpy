import { ApiProperty } from '@nestjs/swagger';
import {
  //IsCurrency,
  IsDate,
  IsNumber,
  IsOptional,
  //IsPositive,
  //IsString,
  Min,
} from 'class-validator';
export class PriceHistoryDto {
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
  purchasePrice?: number = 0;

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
  salePrice?: number = 0;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsDate()
  @IsOptional()
  appliedDate?: Date;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsDate()
  @IsOptional()
  endAppliedDate?: Date;
}
