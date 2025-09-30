import { NozzleDto } from '../../nozzles/dto/nozzle.dto';

import { IsletDto } from '../../islets/dto/islet.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  MaxLength,
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
  Type,
} from 'class-transformer';

export class CreateDispenserDto {
  @ApiProperty({
    required: false,
    type: () => [NozzleDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NozzleDto)
  @IsArray()
  nozzles?: NozzleDto[] | null;

  @ApiProperty({
    required: true,
    type: () => IsletDto,
  })
  @ValidateNested()
  @Type(() => IsletDto)
  @IsNotEmptyObject()
  islet: IsletDto;

  @ApiProperty({
    required: true,
    type: () => String,
    maxLength: 10,
    description: 'Reference ID (max 10 characters) must be unique',
    example: 'ABC123',
  })
  @IsString()
  @MaxLength(10)
  dispRef: string;

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
  brand?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
