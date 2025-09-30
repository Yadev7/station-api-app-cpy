import { StationDto } from '../../stations/dto/station.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { ContactDto } from '../../shared/dto/contact.dto';
import { AddressDto } from '../../shared/dto/address.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateStationOwnerDto {
  @ApiProperty({
    required: false,
    type: () => [StationDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StationDto)
  @IsArray()
  stations?: StationDto[] | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ownerType: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ownerName: string;

  @ApiProperty({
    required: false,
    type: () => ContactDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto) // 👈 add this
  contact?: ContactDto | null;

  @ApiProperty({
    required: false,
    type: () => AddressDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto) // 👈 add this
  address?: AddressDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
