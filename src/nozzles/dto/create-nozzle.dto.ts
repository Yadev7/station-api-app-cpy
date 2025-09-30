import { DispenserDto } from '../../dispensers/dto/dispenser.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDate,
  MaxLength,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  //Transform,
  Type,
} from 'class-transformer';

export class CreateNozzleDto {
  @ApiProperty({
    required: true,
    type: () => DispenserDto,
  })
  @ValidateNested()
  @Type(() => DispenserDto)
  @IsNotEmptyObject()
  dispenser: DispenserDto;

  @ApiProperty({
    type: () => Date,
    required: false,
    description:
      'Timestamp of last index. Defaults to server time if not provided.',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastIndexTime?: Date;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastIndexDate?: Date;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  lastIndex?: number;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  lubricantRate?: number;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isMixer?: boolean;

  @ApiProperty({
    required: true,
    type: () => String,
    maxLength: 10,
    description: 'Reference ID (max 10 characters)',
    example: 'ABC123',
  })
  @IsString()
  @MaxLength(10)
  nozzleRef: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  desc?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
