import { IsOptional, IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';
export class EntrepriseDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    type: () => AddressDto,
  })
  @IsOptional()
  headOffice?: AddressDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsUrl()
  siteURL?: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  logo?: string;
}
