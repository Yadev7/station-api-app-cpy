import { IsletDto } from '../../islets/dto/islet.dto';

import { DepositDto } from '../../deposits/dto/deposit.dto';

import { ProductDto } from '../../products/dto/product.dto';

import { StationOwnerDto } from '../../station-owners/dto/station-owner.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
  IsArray,
  Min,
  Max,
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
import { TankDto } from 'src/tanks/dto/tank.dto';

export class CreateStationDto {
  @ApiProperty({
    required: false,
    type: () => [IsletDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => IsletDto)
  @IsArray()
  islets?: IsletDto[] | null;

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
    required: false,
    type: () => [DepositDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DepositDto)
  @IsArray()
  deposits?: DepositDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [ProductDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsArray()
  products?: ProductDto[] | null;

  @ApiProperty({
    required: true,
    type: () => StationOwnerDto,
  })
  @ValidateNested()
  @Type(() => StationOwnerDto)
  @IsNotEmptyObject()
  owner: StationOwnerDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  ICE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  RC?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  IF?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  CNSS?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    minimum: 0,
    maximum: 100,
  })
  //@IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  tvaCarb?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  tvaLub?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  tvaService?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  tvaCoffeRest?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  tvaShop?: number | null;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  displayHeader?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  displayFooter?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  logo?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  stampImg?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  signatureImg?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  imgs?: string | null;

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
