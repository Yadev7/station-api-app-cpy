import { IsOptional, IsString, IsEmail } from 'class-validator';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class ContactDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  @IsOptional()
  job?: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  mobilePhone?: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  @IsOptional()
  groundPhone?: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsEmail()
  mailBox?: string;

  @ApiProperty({
    required: false,
    type: () => AddressDto,
  })
  @IsOptional()
  @Type(() => AddressDto) // 👈 add this
  contactAddress?: AddressDto;
}
