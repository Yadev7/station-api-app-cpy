import { StationDto } from '../../stations/dto/station.dto';

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
import { ContactDto } from 'src/shared/dto/contact.dto';
import { AddressDto } from 'src/shared/dto/address.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateDepositDto {
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
    type: () => ContactDto,
    description: 'Contact id  optional',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto) // 👈 add this
  contact?: ContactDto | null;

  @ApiProperty({
    required: false,
    type: () => AddressDto,
    description: 'Address id  optional',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto) // 👈 add this
  address?: AddressDto | null;

  @ApiProperty({
    required: false,
    type: () => String,
    description: 'Description  optional',
  })
  @IsOptional()
  @IsString()
  desc?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
    description: 'Name Req and unique',
  })
  //@IsOptional()
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
