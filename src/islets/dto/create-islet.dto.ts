import { DispenserDto } from '../../dispensers/dto/dispenser.dto';

import { StationDto } from '../../stations/dto/station.dto';

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

export class CreateIsletDto {
  @ApiProperty({
    required: false,
    type: () => [DispenserDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DispenserDto)
  @IsArray()
  dispensers?: DispenserDto[] | null;

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
    type: () => String,
    maxLength: 10,
    description: 'Reference ID (max 10 characters)',
    example: 'ABC123',
  })
  @IsString()
  @MaxLength(10)
  isletRef: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  desc?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
